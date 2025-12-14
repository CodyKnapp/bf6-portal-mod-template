import Team = mod.Team;
import * as modlib from 'modlib';
import CapturePoint = mod.CapturePoint;
import Player = mod.Player;

export class TeamWrapper {
  private readonly STARTING_SCORE = 600;
  private team: Team;
  private teamScore: number;
  private pointsHeld: CapturePoint[];
  private holdsFulcrum: boolean;
  private players: Player[];
  private teamId: number;

  constructor(team: Team) {
    this.team = team;
    this.teamScore = this.STARTING_SCORE;

    this.players = modlib.getPlayersInTeam(team);
    this.teamId = modlib.getTeamId(team);
    const startingScore = this.STARTING_SCORE + this.players.length;
    mod.SetGameModeScore(team, startingScore);
  }

  public decrease(amount: number) {
    this.teamScore -= amount;
    mod.SetGameModeScore(this.team, this.teamScore);
  }

  public isPlayerOnTeam(player: Player): boolean {
    return this.players.some(arg => modlib.getPlayerId(arg) )
  }
}