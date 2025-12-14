import Player = mod.Player;
import * as modlib from 'modlib';
import Team = mod.Team;

export class PlayerWrapper {
  private team: Team;
  private enemyTeam: Team;
  private playerId: number;
  private player: Player;

  constructor(player: Player) {
    this.player = player;
    this.playerId = modlib.getPlayerId(player);
    this.team = mod.GetTeam(player);

  }
}