import Rectangle from "./Rectangle";
export default class Floor {
    public element: Rectangle;
    private selfType: string;
    private selfX: number;
    private selfY: number;
    private selfWidth: number;
    private selfHeight: number;
    private fillColor: string;
    private strokeColor: string;
    private strokeWidth: number;

    constructor(x: number, y: number, width: number, height: number, type: string) {
        this.element = new Rectangle(x, y, width, height);
        this.selfX = x;
        this.selfY = y;
        this.selfWidth = width;
        this.selfHeight = height;
        this.selfType = type;
    }

    public get x(): number {
        return this.selfX;
    }

    public set x(newX: number) {
        this.selfX = this.element.x = newX;
    }

    public get y(): number {
        return this.selfY;
    }

    public set y(newY: number) {
        this.selfY = this.element.y = newY;
    }

    public get width(): number {
        return this.selfWidth;
    }

    public set width(newWidth: number) {
        this.selfWidth = this.element.width = newWidth;
    }

    public get height(): number {
        return this.selfHeight;
    }

    public set height(newHeight: number) {
        this.selfHeight = this.element.height = newHeight;
    }

    public get type(): string {
        return this.selfType;
    }

    public set type(newType: string) {
        this.selfType = newType;
    }

    public setStroke(color: string, width: number) {
        this.strokeColor = this.element.strokeColor = color;
        this.strokeWidth = this.element.strokeWidth = width;
    }

    public setFillColor(color: string) {
        this.fillColor = this.element.fill = color;
    }
}
