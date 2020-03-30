var app = new Vue({
    el: "#app",
    data: {
        data: [],
        value: []
    },
    mounted: function () {
        this.generateData();
    },
    methods: {
        generateData: function () {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    key: "aaa" + i,
                    label: `备选项` + i,
                    disabled: i % 4 === 0
                });
            }
            this.data = data;
        }
    }
});


