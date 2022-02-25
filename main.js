const app = Vue.createApp({
    data() {
        return {
            player: 1,
            bot: 1,
            currentRound: 1,
            winner: '',
            playerAttack: 0.05,
            botAttack: 0.08,
            critRate: 2.75,
            end: false,

            rgbPlayer: 'green',
            rgbBot: 'green',
        };
    },
    methods: {
        attack() {
            if (this.player <= 0 || this.bot <= 0) return;

            if (critical()) {
                this.bot -= this.playerAttack * this.critRate;
                this.player -= this.botAttack;
                console.log('player fait un CC');
            } else if (critical()) {
                this.bot -= this.playerAttack;
                this.player -= this.botAttack * this.critRate;
                console.log('bot fait un CC');
            } else {
                this.bot -= this.playerAttack;
                this.player -= this.botAttack;
            }
            this.currentRound++;
        },
        magicAttack() {
            if (this.player <= 0 || this.bot <= 0) return;

            this.bot -= this.playerAttack * 2;
            this.player -= this.botAttack;
            this.currentRound++;
        },
        heal() {
            if (this.player <= 0 || this.bot <= 0) return;

            if (this.player > 90) {
                this.player += (1 - this.player);
            } else {
                this.player += 0.10;
            }
            this.botAttack += 0.05;
            this.currentRound++;
        },
        giveUp() {
            this.end = true;
            this.player = 0;
        },
    },
    watch: {
        player(value) {
            if (value >= 0.5) {
                this.rbgPlayer = 'green';
            } else if (value >= 0.25 && value < 0.5) {
                this.rbgPlayer = 'yellow';
                console.log('this.rbgPlayer : ', this.rbgPlayer)
            } else {
                this.rbgPlayer = 'red';
            }
        },
        bot(value) {
            if (value >= 0.5) {
                this.rbgBot = 'yellow';
            } else if ((value >= 0.25) && (value < 0.5)) {
                this.rbgBot = 'yellow';
            } else {
                this.rbgBot = 'yellow';
            }
        },
    },
    computed: {
        styleBarBot() {
            if (this.bot >= 0.5) {
                this.rbgBot = 'green';
            } else if ((this.player >= 0.25) && (this.player < 0.5)) {
                this.rbgBot = 'yellow';
            } else {
                this.rbgBot = 'red';
            }
            return { backgroundColor: this.rbgBot };
        },
        changeClass() {
            if (this.end === true) {
                return 'endClass';
            }
        }
    }
});
app.mount('#app');

function critical() {
    return Math.floor(Math.random() * 100) > 85;
}