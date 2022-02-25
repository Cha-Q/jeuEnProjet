const app = Vue.createApp({
    data() {
        return {
            player: 100,
            bot: 100,
            currentRound: 1,
            winner: '',
            playerAttack: 5,
            botAttack: 5,
            critRate: 2.5,
            end: false,

            rgbPlayer: '',
            rgbBot: '',
            imgBot: 'https://i.gifer.com/DD0.gif',
            imgPlayer: 'https://i.gifer.com/tGR.gif',
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
                this.player += (100 - this.player);
            } else {
                this.player += 10;
            }
            this.botAttack += 5;
            this.currentRound++;
        },
        giveUp() {
            if (this.player <= 0 || this.bot <= 0) return;

            this.end = true;
            this.player = 0;
        },
        restart() {
            location.reload();
        },

    },
    watch: {
        player(value) {
            if (value <= 0) {
                this.imgPlayer = "https://i.gifer.com/7v8P.gif";
                this.imgBot = "https://i.gifer.com/ZIb4.gif";
            }
        },
        bot(value) {
            if (value <= 0) {
                this.imgBot = "https://i.gifer.com/7v8P.gif";
                this.imgPlayer = "https://i.gifer.com/78FK.gif"; //https://i.gifer.com/ZIb4.gif
            }
        }
    }, //t'as essayé des give up avec les GIF

    computed: {
        styleBarPlayer() {
            if (this.player >= 50) {
                console.log(this.player);
                this.rbgPlayer = 'green';
            } else if ((this.player >= 25) && (this.player < 50)) {
                this.rbgPlayer = 'yellow';
            } else {
                this.rbgPlayer = 'red';
            }
            return {
                width: this.player + '%',
                backgroundColor: this.rbgPlayer,
            };
        },

        styleBarBot() {
            if (this.bot >= 50) {
                console.log(this.bot);
                this.rbgBot = 'green';
            } else if ((this.bot >= 25) && (this.bot < 50)) {
                this.rbgBot = 'yellow';
            } else {
                this.rbgBot = 'red';
            }
            return {
                width: this.bot + '%',
                backgroundColor: this.rbgBot
            };
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