(() => {
  const guildId = '1554135898105446410';
  const inviteCode = 'DyCnJmEYy';

  const meta = document.getElementById('discordCommunityMeta');
  const guildName = document.getElementById('discordGuildName');
  const card = document.getElementById('discordHeroCard');
  if (!meta || !guildName || !card) return;

  const timeoutFetch = async (url, timeoutMs = 5000) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'omit',
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } finally {
      clearTimeout(timeout);
    }
  };

  const format = value => Number(value).toLocaleString();

  const loadDiscord = async () => {
    let widgetData = null;
    let inviteData = null;

    try {
      widgetData = await timeoutFetch(
        `https://discord.com/api/guilds/${guildId}/widget.json`
      );
    } catch (_) {
      // Server Widget may be disabled; invite API remains a safe fallback.
    }

    try {
      inviteData = await timeoutFetch(
        `https://discord.com/api/v10/invites/${inviteCode}?with_counts=true&with_expiration=true`
      );
    } catch (_) {
      // Keep the static Discord card if Discord blocks or rate-limits the lookup.
    }

    const resolvedName =
      widgetData?.name ||
      inviteData?.guild?.name;

    const online = Number(
      widgetData?.presence_count ??
      inviteData?.approximate_presence_count
    );

    const members = Number(inviteData?.approximate_member_count);

    if (resolvedName) {
      guildName.textContent = resolvedName;
    }

    if (Number.isFinite(online) && Number.isFinite(members)) {
      meta.textContent = `${format(online)} online · ${format(members)} members`;
      card.classList.add('discord-live');
    } else if (Number.isFinite(online)) {
      meta.textContent = `${format(online)} online · Join Discord`;
      card.classList.add('discord-live');
    } else if (Number.isFinite(members)) {
      meta.textContent = `${format(members)} members · Join Discord`;
    } else {
      meta.textContent = 'Community · Help · Announcements';
    }

    if (widgetData?.instant_invite) {
      card.href = widgetData.instant_invite;
    }
  };

  loadDiscord();
})();