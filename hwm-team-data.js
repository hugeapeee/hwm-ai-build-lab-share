(function () {
    'use strict';

    const STORAGE_KEY = 'hwm-build-lab-team-dossiers-v1';
    const SESSION_ONE_KEY = 'hwm-build-lab-session-01';
    const ROLE_KEY = 'hwm-build-lab-session-02-roles';

    function clean(value) {
        return String(value ?? '').trim();
    }

    function cleanList(value) {
        const source = Array.isArray(value) ? value : clean(value).split(/[\n,]+/);
        return [...new Set(source.map(clean).filter(Boolean))];
    }

    function defaultTeam(index) {
        return {
            id: `team-${index + 1}`,
            name: `Team ${index + 1}`,
            members: [],
            roles: {
                driver: '',
                context: '',
                tester: ''
            },
            project: '',
            workflow: '',
            problem: '',
            materials: '',
            success: ''
        };
    }

    function normalizeTeam(team, index) {
        const fallback = defaultTeam(index);
        return {
            ...fallback,
            ...team,
            id: fallback.id,
            name: clean(team?.name) || fallback.name,
            members: cleanList(team?.members),
            roles: {
                driver: clean(team?.roles?.driver),
                context: clean(team?.roles?.context),
                tester: clean(team?.roles?.tester)
            },
            project: clean(team?.project),
            workflow: clean(team?.workflow),
            problem: clean(team?.problem),
            materials: clean(team?.materials),
            success: clean(team?.success)
        };
    }

    function normalize(data) {
        const teams = Array.isArray(data?.teams) ? data.teams : [];
        return {
            version: 1,
            updatedAt: clean(data?.updatedAt),
            teams: [0, 1, 2].map((index) => normalizeTeam(teams[index], index))
        };
    }

    function parseStorage(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (error) {
            return null;
        }
    }

    function mergeExistingBasics(data) {
        const sessionOne = parseStorage(SESSION_ONE_KEY);
        const rolesState = parseStorage(ROLE_KEY);

        data.teams.forEach((team, index) => {
            const sessionMembers = Array.isArray(sessionOne?.teams?.[index])
                ? cleanList(sessionOne.teams[index])
                : [];
            const sessionName = clean(sessionOne?.teamNames?.[index]);
            const roleTeam = rolesState?.teams?.[index];

            if ((!team.name || team.name === `Team ${index + 1}`) && sessionName) {
                team.name = sessionName;
            }
            if (!team.members.length && sessionMembers.length) {
                team.members = sessionMembers;
            }
            if (roleTeam) {
                if ((!team.name || team.name === `Team ${index + 1}`) && clean(roleTeam.name)) {
                    team.name = clean(roleTeam.name);
                }
                if (!team.members.length && Array.isArray(roleTeam.members)) {
                    team.members = cleanList(roleTeam.members);
                }
                team.roles = {
                    driver: team.roles.driver || clean(roleTeam.driver),
                    context: team.roles.context || clean(roleTeam.context),
                    tester: team.roles.tester || clean(roleTeam.tester)
                };
            }
        });

        return data;
    }

    function load() {
        return mergeExistingBasics(normalize(parseStorage(STORAGE_KEY)));
    }

    function save(data) {
        const normalized = normalize(data);
        normalized.updatedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
        window.dispatchEvent(new CustomEvent('hwm-team-data-change', { detail: normalized }));
        return normalized;
    }

    function updateTeam(index, patch) {
        const data = load();
        data.teams[index] = normalizeTeam({
            ...data.teams[index],
            ...patch,
            roles: {
                ...data.teams[index].roles,
                ...(patch?.roles || {})
            }
        }, index);
        return save(data);
    }

    function mergeTeamBasics(roleTeams) {
        if (!Array.isArray(roleTeams)) return load();
        const data = load();
        roleTeams.slice(0, 3).forEach((source, index) => {
            const team = data.teams[index];
            team.name = clean(source?.name) || team.name;
            team.members = cleanList(source?.members).length
                ? cleanList(source.members)
                : team.members;
            team.roles = {
                driver: Object.prototype.hasOwnProperty.call(source || {}, 'driver')
                    ? clean(source.driver)
                    : team.roles.driver,
                context: Object.prototype.hasOwnProperty.call(source || {}, 'context')
                    ? clean(source.context)
                    : team.roles.context,
                tester: Object.prototype.hasOwnProperty.call(source || {}, 'tester')
                    ? clean(source.tester)
                    : team.roles.tester
            };
        });
        return save(data);
    }

    function completeness(team) {
        const fields = ['project', 'workflow', 'problem', 'materials', 'success'];
        const done = fields.filter((field) => clean(team?.[field])).length;
        return Math.round((done / fields.length) * 100);
    }

    function contextText(team) {
        const roles = [
            team?.roles?.driver && `Cầm máy: ${team.roles.driver}`,
            team?.roles?.context && `Biết chuyện: ${team.roles.context}`,
            team?.roles?.tester && `Kiếm chuyện: ${team.roles.tester}`
        ].filter(Boolean).join(' · ');

        return [
            `TEAM: ${clean(team?.name) || 'Chưa đặt tên'}`,
            `THÀNH VIÊN: ${cleanList(team?.members).join(', ') || 'Chưa nhập'}`,
            roles ? `VAI TRÒ: ${roles}` : 'VAI TRÒ: Chưa chốt',
            `BÀI MUỐN XỬ: ${clean(team?.project) || 'Chưa nhập'}`,
            '',
            'WORKFLOW HIỆN TẠI:',
            clean(team?.workflow) || 'Chưa nhập',
            '',
            'VẤN ĐỀ MUỐN XỬ:',
            clean(team?.problem) || 'Chưa nhập',
            '',
            'DỮ LIỆU ĐỂ BUILD:',
            clean(team?.materials) || 'Chưa nhập',
            '',
            'THẾ NÀO LÀ XÀI ĐƯỢC:',
            clean(team?.success) || 'Chưa nhập'
        ].join('\n');
    }

    window.HWMTeamData = {
        STORAGE_KEY,
        load,
        save,
        updateTeam,
        mergeTeamBasics,
        completeness,
        contextText,
        cleanList
    };
})();
