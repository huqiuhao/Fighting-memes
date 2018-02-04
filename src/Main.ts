import Floor from "./Floor";
import Role from "./Role";
import Stage from "./Stage";

class Main {
    private stage: Stage;
    private floors: Floor[];
    private stageWidth: number;
    private stageHeight: number;
    private verticalSpacing: number;
    private floorHeight: number;
    private interval: number;
    private selfRole: Role;
    constructor() {
        this.stage = new Stage();
        this.floors = [];
        this.stageWidth = 1920;
        this.stageHeight = 1080;
        this.verticalSpacing = 200;
        this.floorHeight = 35;
        this.interval = 17;
    }
    public createScene() {
        this.stage.color = "#e8e8e8";
        this.stage.width = this.stageWidth;
        this.stage.height = this.stageHeight;
        const groundY = this.stageHeight - this.floorHeight;
        let y: number = groundY - this.verticalSpacing - this.floorHeight;
        for (; y > 0; y -= (this.verticalSpacing + this.floorHeight)) {
            let rs: number = Math.random() * 200;
            while (rs < this.stageWidth) {
                let re = rs + Math.random() * 800 + 300;
                if (re > this.stageWidth) {
                    re = this.stageWidth;
                    if (re - rs < 200) {
                        rs = re;
                        continue;
                    }
                }
                const floor: Floor = new Floor(rs, y, re - rs, this.floorHeight, "basic");
                floor.setFillColor("#ffffff");
                floor.setStroke("#000000", 2);
                this.floors.push(floor);
                this.stage.add(floor.element);
                rs = re + Math.random() * 300 + 200;
            }
        }
        const ground: Floor = new Floor(0, groundY, this.stageWidth, this.floorHeight, "basic");
        ground.setFillColor("#ffffff");
        ground.setStroke("#000000", 2);
        this.floors.push(ground);
        this.stage.add(ground.element);

        this.createRole(groundY);
        document.addEventListener("keydown", (e) => this.keyboardController(e));
        document.addEventListener("keyup", (e) => this.keyboardController(e));
    }

    private createRole(groundY: number) {
        const roleX: number = Math.random() * this.stageWidth;
        const roleY: number = groundY;
        this.selfRole = new Role(roleX, roleY, 0, "#66ccff");
        this.stage.add(this.selfRole.element);
    }
/**
 * player's action
 * keycode 39 is for "→"/moveright
 * keycode 37 is for "←"/moveleft
 * keycode 40 is for "↓"/movedown
 * keycode 38 is for "↑"/jump
 */
    private keyboardController(e: KeyboardEvent) {
        if (e.type === "keydown") {
            switch (e.keyCode) {
                case 39:
                    if (!this.selfRole.rightTimer) {
                        this.selfRole.rightTimer = setInterval(
                            () => this.selfRoleMove(e),
                            this.interval,
                        );
                    }
                    break;
                case 37:
                    if (!this.selfRole.leftTimer) {
                        this.selfRole.leftTimer = setInterval(
                            () => this.selfRoleMove(e),
                            this.interval,
                        );
                    }
                    break;
                case 40:
                    if (!this.selfRole.downTimer) {
                        this.selfRole.downTimer = setInterval(
                            () => this.selfRoleMove(e),
                            this.interval,
                        );
                    }
                    break;
                case 38:
                    if (!this.selfRole.upTimer) {
                        this.selfRole.upTimer = setInterval(
                            () => this.selfRoleMove(e),
                            this.interval,
                        );
                    }
                    break;
            }
        } else if (e.type === "keyup") {
            switch (e.keyCode) {
                case 39:
                    clearInterval(this.selfRole.rightTimer);
                    this.selfRole.rightTimer = undefined;
                    break;
                case 37:
                    clearInterval(this.selfRole.leftTimer);
                    this.selfRole.leftTimer = undefined;
                    break;
                case 40:
                    clearInterval(this.selfRole.downTimer);
                    this.selfRole.downTimer = undefined;
                    break;
                case 38:
                    clearInterval(this.selfRole.upTimer);
                    this.selfRole.upTimer = undefined;
                    break;
            }
        }
    }

    private selfRoleMove(e: KeyboardEvent) {
        if (e.keyCode === 39) {
            const moveX: number = this.selfRole.x + this.selfRole.moveSpeed;
            this.selfRole.x = moveX % this.stageWidth;
        } else if (e.keyCode === 37) {
            const moveX: number = this.selfRole.x - this.selfRole.moveSpeed;
            this.selfRole.x = (moveX + this.stageWidth) % this.stageWidth;
        }
            // 40
            // 38
    }

    private selfRoleFall() {
        this.selfRole.jumpSpeed += this.selfRole.weight;
        let nextY: number = this.selfRole.y + this.selfRole.jumpSpeed;
        if (
            nextY + this.selfRole.height >=
            this.selfRole.footY + this.verticalSpacing
        ) {
            let isFind: boolean = false;
            for (const floor of this.floors) {
                if (
                    this.selfRole.x < floor.x + floor.width &&
                    this.selfRole.x - this.selfRole.width > floor.x
                ) {
                    nextY = floor.y;
                    isFind = true;
                    clearInterval(this.selfRole.fallTimer);
                    this.selfRole.fallTimer = undefined;
                    break;
                }
            }
            if (!isFind) {
                this.selfRole.footY += this.verticalSpacing;
            }
        }
        this.selfRole.y = nextY;
    }
}

window.onload = () => {
    const main: Main = new Main();
    main.createScene();
};
