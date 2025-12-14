import Player = mod.Player;
import * as modlib from 'modlib';

export class PlayerWrapper {
  public readonly playerId: number;
  private readonly player: Player;

  constructor(player: Player) {
    this.player = player;
    this.playerId = modlib.getPlayerId(player);
  }
}