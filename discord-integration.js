(() => {
  const inviteCode = 'DyCnJmEYy';
  const meta = document.getElementById('discordCommunityMeta');
  const guildName = document.getElementById('discordGuildName');
  if (!meta || !guildName) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  fetch(`https://discord.com/api/v10/invites/${inviteCode}?with_counts=true&with_expiration=true`, {
    method: 'GET',
    credentials: 'omit',
    signal: controller.signal,
    headers: { 'Accept': 'application/json' }
  })
    .then(response => {
      if (!response.ok) throw new Error('Discord invite lookup failed');
      return response.json();
    })
    .then(data => {
      if (data?.guild?.name) guildName.textContent = data.guild.name;
      const online = Number(data?.approximate_presence_count);
      const members = Number(data?.approximate_member_count);
      if (Number.isFinite(online) && Number.isFinite(members)) {
        meta.textContent = `${online.toLocaleString()} online · ${members.toLocaleString()} members`;
      } else if (Number.isFinite(members)) {
        meta.textContent = `${members.toLocaleString()} members · Join Discord`;
      }
    })
    .catch(() => {
      meta.textContent = 'Community · Help · Announcements';
    })
    .finally(() => clearTimeout(timeout));
})();