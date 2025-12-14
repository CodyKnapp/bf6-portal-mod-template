import * as modlib from 'modlib';
import {PlayerWrapper} from "./PlayerWrapper";
import {CapturePointWrapper} from "./CapturePointWrapper";

export class TeamWrapper {
  private readonly STARTING_SCORE = 600;
  private readonly team: mod.Team;
  private teamScore: number;
  private pointsHeld: CapturePointWrapper[] = [];
  private players: PlayerWrapper[];
  public isFulcrumHolder: boolean = false;
  public teamId: number;

  constructor(team: mod.Team) {
    this.team = team;
    this.teamScore = this.STARTING_SCORE;

    this.players = modlib.getPlayersInTeam(team).map((player: mod.Player) => new PlayerWrapper(player));
    this.teamId = modlib.getTeamId(team);
    const startingScore = this.STARTING_SCORE + this.players.length;
    mod.SetGameModeScore(team, startingScore);
    console.log(`Starting team ${this.teamId} with players ${this.players} with ${startingScore} tickets`);
  }

  public decrease(amount: number) {
    this.teamScore -= amount;
    mod.SetGameModeScore(this.team, this.teamScore);
  }

  public isPlayerOnTeam(player: mod.Player): boolean {
    const playerId = modlib.getPlayerId(player);
    return this.players.some(arg => arg.playerId == playerId);
  }

  public capturedPoint(point: CapturePointWrapper) {
    if (point.isFulcrum) this.isFulcrumHolder = true;

    this.pointsHeld.push(point);
  }

  public lostPoint(point: CapturePointWrapper) {
    if (point.isFulcrum) this.isFulcrumHolder = false;

    this.pointsHeld.splice(this.pointsHeld.indexOf(point), 1);
  }

  public zoneCount(): number {
    return this.pointsHeld.length;
  }
}