module.exports = {
    /**
     * 过滤请求字段
     * @param arr
     * @returns {{}}
     */
    only(arr) {
        let data ;
        // 判断请求类型
        switch (this.method){
            case 'GET':{
                data = this.query;
            };break;
            case 'POST':{
                data = this.body;
            };break;
        }
        let res ={};
        // 遍历数据
        arr.map(item=>{
            res[item] = data[item];
        })
        return res;
    }
};
