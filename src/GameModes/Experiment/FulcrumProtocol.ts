import { Core_AGameMode } from '../../Core/AGameMode';
import * as modlib from 'modlib';
import CapturePoint = mod.CapturePoint;
import Team = mod.Team;

export class FulcrumProtocol extends Core_AGameMode {
  private readonly STARTING_SCORE = 600;
  private capturePoints;
  private fulcrumPoint;
  private teams;

  onGameModeStarted(): void {
    this.capturePoints = [
      mod.GetCapturePoint(602),
      mod.GetCapturePoint(603),
      mod.GetCapturePoint(604),
      mod.GetCapturePoint(605)
    ].map(this.initializeCapturePoint);

    this.fulcrumPoint = mod.GetCapturePoint(601);
    this.initializeFulcrum(this.fulcrumPoint);

    this.teams = [mod.GetTeam(1), mod.GetTeam(2)].map(this.initializeTeam);

    mod.SetGameModeScore(mod.GetTeam(1), this.STARTING_SCORE);
    mod.SetGameModeScore(mod.GetTeam(2), this.STARTING_SCORE);
  }

  // Adjust scoring so no points are scored unless the middle zone is held
  // Each death = tickets - number of zones held




  private initializeCapturePoint(point: CapturePoint): CapturePoint {
    mod.EnableCapturePointDeploying(point, true);
    mod.EnableGameModeObjective(point, true);
    mod.SetCapturePointCapturingTime(point, 10);
    mod.SetCapturePointNeutralizationTime(point, 10);
    mod.SetMaxCaptureMultiplier(point, 2);

    return point;
  }

  private initializeFulcrum(point: CapturePoint): CapturePoint {
    mod.EnableCapturePointDeploying(point, true);
    mod.EnableGameModeObjective(point, true);
    mod.SetCapturePointCapturingTime(point, 15);
    mod.SetCapturePointNeutralizationTime(point, 15);
    mod.SetMaxCaptureMultiplier(point, 2);

    return point;
  }

  private initializeTeam(team: Team): Team {
    const playerList = modlib.getPlayersInTeam(team);
    const startingScore = this.STARTING_SCORE + playerList.length;
    mod.SetGameModeScore(team, startingScore);

    return team;
  }
}