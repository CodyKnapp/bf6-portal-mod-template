import * as modlib from 'modlib';

export class PlayerWrapper {
  public readonly playerId: number;
  private readonly player: mod.Player;

  constructor(player: mod.Player) {
    this.player = player;
    this.playerId = modlib.getPlayerId(player);
  }
}