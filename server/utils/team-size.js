const TEAM_SIZE_MAX = 100;

export const isValidTeamSize = (value) => {
  const teamSize = String(value).trim();

  return /^\d+$/.test(teamSize) && Number(teamSize) > 0 && Number(teamSize) <= TEAM_SIZE_MAX;
};
