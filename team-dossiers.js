(function () {
    'use strict';

    const form = document.getElementById('teamDossierForm');
    const tabs = document.getElementById('teamTabs');
    const heading = document.getElementById('activeTeamHeading');
    const completion = document.getElementById('completionValue');
    const roleSummary = document.getElementById('roleSummary');
    const saveStatus = document.getElementById('saveStatus');
    const copyButton = document.getElementById('copyDossier');
    const exportButton = document.getElementById('exportDossiers');
    let activeIndex = 0;
    let data = window.HWMTeamData.load();
    let saveTimer = null;
    let importedFromLocal = false;

    function importFromHash() {
        const match = window.location.hash.match(/^#import=(.+)$/);
        if (!match) return;
        try {
            const payload = JSON.parse(decodeURIComponent(match[1]));
            if (!Array.isArray(payload?.teams) || payload.teams.length !== 3) return;
            data = window.HWMTeamData.mergeData(payload);
            importedFromLocal = true;
            window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
        } catch (error) {
            saveStatus.textContent = 'Link nhập dữ liệu không hợp lệ';
        }
    }

    function escape(value) {
        return String(value).replace(/[&<>"']/g, (char) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[char]);
    }

    function renderTabs() {
        tabs.innerHTML = data.teams.map((team, index) => `
            <button
                class="team-tab${index === activeIndex ? ' active' : ''}"
                type="button"
                role="tab"
                aria-selected="${index === activeIndex}"
                data-team-index="${index}">
                <span>TEAM ${index + 1}</span>
                <strong>${escape(team.name)}</strong>
                <em>${window.HWMTeamData.completeness(team)}%</em>
            </button>
        `).join('');

        tabs.querySelectorAll('[data-team-index]').forEach((button) => {
            button.addEventListener('click', () => {
                persistNow();
                activeIndex = Number(button.dataset.teamIndex);
                render();
            });
        });
    }

    function fillForm() {
        const team = data.teams[activeIndex];
        heading.textContent = team.name;
        completion.textContent = `${window.HWMTeamData.completeness(team)}%`;
        renderRoleSummary(team);
        form.elements.name.value = team.name;
        form.elements.members.value = team.members.join(', ');
        form.elements.driver.value = team.roles.driver;
        form.elements.context.value = team.roles.context;
        form.elements.tester.value = team.roles.tester;
        form.elements.project.value = team.project;
        form.elements.workflow.value = team.workflow;
        form.elements.problem.value = team.problem;
        form.elements.materials.value = team.materials;
        form.elements.success.value = team.success;
    }

    function renderRoleSummary(team) {
        roleSummary.textContent = [
            team.roles.driver && `Cầm máy: ${team.roles.driver}`,
            team.roles.context && `Biết chuyện: ${team.roles.context}`,
            team.roles.tester && `Kiếm chuyện: ${team.roles.tester}`
        ].filter(Boolean).join(' · ') || 'Vai trò sẽ tự kéo từ Buổi 2–3.';
    }

    function collectForm() {
        return {
            name: form.elements.name.value,
            members: window.HWMTeamData.cleanList(form.elements.members.value),
            roles: {
                driver: form.elements.driver.value,
                context: form.elements.context.value,
                tester: form.elements.tester.value
            },
            project: form.elements.project.value,
            workflow: form.elements.workflow.value,
            problem: form.elements.problem.value,
            materials: form.elements.materials.value,
            success: form.elements.success.value
        };
    }

    function persistNow() {
        window.clearTimeout(saveTimer);
        data.teams[activeIndex] = {
            ...data.teams[activeIndex],
            ...collectForm()
        };
        data = window.HWMTeamData.save(data);
        saveStatus.textContent = 'Đã lưu';
        renderTabs();
        heading.textContent = data.teams[activeIndex].name;
        completion.textContent = `${window.HWMTeamData.completeness(data.teams[activeIndex])}%`;
        renderRoleSummary(data.teams[activeIndex]);
    }

    function scheduleSave() {
        saveStatus.textContent = 'Đang lưu...';
        window.clearTimeout(saveTimer);
        saveTimer = window.setTimeout(persistNow, 320);
    }

    function render() {
        renderTabs();
        fillForm();
        saveStatus.textContent = importedFromLocal
            ? 'Đã nhập tên team và vai trò'
            : (data.updatedAt ? 'Đã kéo dữ liệu cũ' : 'Đã sẵn sàng');
    }

    form.addEventListener('input', scheduleSave);

    copyButton.addEventListener('click', async () => {
        persistNow();
        try {
            await navigator.clipboard.writeText(window.HWMTeamData.contextText(data.teams[activeIndex]));
            copyButton.textContent = 'Đã copy';
        } catch (error) {
            copyButton.textContent = 'Bôi đen rồi copy';
        }
        window.setTimeout(() => { copyButton.textContent = 'Copy hồ sơ'; }, 1500);
    });

    exportButton.addEventListener('click', () => {
        persistNow();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'hwm-build-lab-team-dossiers.json';
        link.click();
        URL.revokeObjectURL(url);
    });

    window.addEventListener('beforeunload', persistNow);
    importFromHash();
    render();
})();
