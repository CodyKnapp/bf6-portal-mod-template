export class CapturePointWrapper {
    private readonly capturePoint;
    public readonly isFulcrum;
    public readonly capturePointId;

    constructor(pointId: number, isFulcrum: boolean) {
        this.capturePointId = pointId;
        this.capturePoint = mod.GetCapturePoint(pointId);
        this.isFulcrum = isFulcrum;

        const captureTime = isFulcrum ? 15 : 10;

        mod.EnableCapturePointDeploying(this.capturePoint, true);
        mod.EnableGameModeObjective(this.capturePoint, true);
        mod.SetCapturePointCapturingTime(this.capturePoint, captureTime);
        mod.SetCapturePointNeutralizationTime(this.capturePoint, captureTime);
        mod.SetMaxCaptureMultiplier(this.capturePoint, 2);
    }
}