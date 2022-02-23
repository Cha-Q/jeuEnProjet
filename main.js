const app = Vue.createApp({
    data() {
        return {
            player: 1,
            bot: 1,
            currentRound: 1,
            winner: "",

            playerAttack: 0.05,
            botAttack: 0.05,
        };
    },
    methods: {
        attack() {
            this.bot -= this.playerAttack;
            this.player = counterAttack(this.player);

            this.currentRound++;
        },
        magicAttack() {
            this.bot -= this.playerAttack * 2;
            this.player -= this.botAttack;

            this.currentRound++;
        },
        heal() {
            if (this.player > 90) {
                this.player += (1 - this.player);
            } else {
                this.player += 0.10;
            }

            this.player -= 0.05;
            this.botAttack += 0.05;

            this.currentRound++;
        },
        giveUp() {},

    },
    watch: {
        player(value) {
            if (value <= 0 && this.bot >= 0) {
                winner = "Player";
            } else if (this.bot <= 0 && value >= 0) {
                winner = "Bot";
            } else {
                winner = "WTF";
            }
        }
    },
    computed: {}
});
app.mount('#app');


function counterAttack(player) {
    setTimeout(() => {
        player -= 1;
    }, 2000);
    return player;
}