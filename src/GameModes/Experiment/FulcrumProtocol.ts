import {Core_AGameMode} from '../../Core/AGameMode';
import * as modlib from 'modlib';
import CapturePoint = mod.CapturePoint;
import Team = mod.Team;
import ScoreboardType = mod.ScoreboardType;
import { TeamWrapper } from '../../Core/TeamWrapper';
import {CapturePointWrapper} from "../../Core/CapturePointWrapper";

export class FulcrumProtocol extends Core_AGameMode {
  private readonly FULCRUM_ID = 601;
  private capturePoints: CapturePointWrapper[];
  private teams: TeamWrapper[];

  onGameModeStarted(): void {
    this.initializeObjectives();
    this.initializeScoreboard();
    this.initializeTeams();
  }

  onPlayerDeployed(eventPlayer: mod.Player) {
    const playerTeam = this.teams.find(team => team.isPlayerOnTeam(eventPlayer));
    const otherTeam = this.teams.find(team => !team.isPlayerOnTeam(eventPlayer));

    if (otherTeam.isFulcrumHolder) {
      playerTeam.decrease(otherTeam.zoneCount());
    }
  }

  onCapturePointCaptured(eventCapturePoint: mod.CapturePoint) {
    this.changePointControl(eventCapturePoint, (team, point) => team.capturedPoint(point));
  }

  onCapturePointLost(eventCapturePoint: mod.CapturePoint) {
    this.changePointControl(eventCapturePoint, (team, point) => team.lostPoint(point));
  }

  private initializeObjectives() {
    this.capturePoints = [602, 603, 604, 605]
        .map(point => new CapturePointWrapper(point, false));

    this.capturePoints.push(new CapturePointWrapper(this.FULCRUM_ID, true));
  }

  private initializeScoreboard(): void {
    mod.SetScoreboardType(ScoreboardType.CustomTwoTeams);
  }

  private initializeTeams() {
    this.teams = [
      new TeamWrapper(mod.GetTeam(1)),
      new TeamWrapper(mod.GetTeam(2))
    ];
  }

  private changePointControl(point: CapturePoint, controlFunction: (team: TeamWrapper, point: CapturePointWrapper) => void) {
    const pointId = mod.GetObjId(point);
    const pointWrapper = this.capturePoints.find(point => point.capturePointId == pointId);

    const capturingTeamId = mod.GetObjId(mod.GetCurrentOwnerTeam(point));
    const teamWrapper = this.teams.find(team => team.teamId == capturingTeamId);
    controlFunction(teamWrapper, pointWrapper);
  }
}