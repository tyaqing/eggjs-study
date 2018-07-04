# 学习日志

## jsonql的规范

拓展了json的用法主要构成如下
```
别名:类型 模型.方法(查询):{
  数据
}
```
一个比较正经的查询语法如下:
```json
{
  // 注册
	"register:mutation User.register()":{  
		"phone":"13200001231",
		"password":"aalskdj"
  },
  // 查询用户列表
	"data:query User.findAll(page=1,limit=2,order=byRank)":{
		"field":"id,phone",
		"where":{
			"id":12,
			"username":"arh"
    },
    "order":{},
		"page":"asd",
		"limit":5,
		"link:query(Link)":{
			"field":"name,link",
			"page":1,
			"row":10
		}
  },
  // 查询某个用户
	"my:query User.findOne(id=1)":{
		"field":"id,username"
	}
}
```