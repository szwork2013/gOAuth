/**
@description 
标签管理模块
@module API
@submodule tabmg
@class tabmg
*/

/**
@description
	标签创建修改		  </br>
	请求类型: POST             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
@method api/tagmg/createtag
@param id {String} TagID，GUID，唯一验证
@param name {String} Tag名称，唯一验证
@param desc {String} Tag说明
@param isactive {String} 是否启用，0代表禁用，1代表启用
@return 参考返回结构
@example
	输入样例
	{
        "id":"3b7c2d81-aa23-4025-85a7-44c28a472718",
        "name":"美男子",
        "desc":"给所有美男子打的标签",
        "status":"1"
    }

	返回码说明
	0        创建或修改成功
	40001	 创建或修改失败
*/
module.exports.postcreatetag = (req,res) => {
    $.proxy_tagmg.tag.createtag(req.body, (result) => {
		res.send(result);
	});
};

/**
@description
	分页获取标签列表			 </br>
	请求类型: GET             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
			                 </br>
	`data` 参数名说明:            </br>
		id 标签ID，GUID </br>
		name 标签名称 </br>
		desc 标签说明 </br>
		status 是否启用，0代表禁用，1代表启用 </br>
		count  </br>
@method api/tagmg/alltags
@param from {Number} 列表起始位置，1代表第一条数据
@param size {Number} 返回条数，建议10
@return 返回架构中的 `data` 说明，`data` 是一个数组结构
@example
	输入样例
	{
        "name":"美男子",
        "status":"1",
        "from": 1,
        "size": 10
    }
    
    返回样例：
    {
		"count":"",
		"result": [{
	        "id":"3b7c2d81-aa23-4025-85a7-44c28a472718",
	        "name":"美男子",
	        "desc":"给所有美男子打的标签",
	        "status":"1"
    	}]
	}
	返回码说明
	0        创建或修改成功
	40001	 创建或修改失败
*/
exports.postalltags = (req,res)  => {
	$.proxy_tagmg.tag.alltags(req.body, (result) => {
		res.send(result);
	});
}

/**
@description
	根据ID获取标签信息			 </br>
	请求类型: GET             </br>
	请求类型: application/json </br>
	返回结构:      			  </br>
			`{
			    "errcode": "0",
			    "errmsg": "",
			    "data":{},
			    "extention":{}
			}`
			                 </br>
	`data` 参数名说明:            </br>
		id 标签ID，GUID </br>
		name 标签名称 </br>
		desc 标签说明 </br>
		status 是否启用，0代表禁用，1代表启用 </br>
		count 已打标签用户个数 </br>
@method api/tagmg/tagbyid
@param id {String} 标签ID，GUID
@return 返回架构中的 `data`说明
@example
	输入样例
	/api/tagmg/tagbyid?id=3b7c2d81-aa23-4025-85a7-44c28a472718

	返回码说明
	0        创建或修改成功
	40001	 创建或修改失败
*/
exports.gettagbyid = (req,res)  => {
	$.proxy_tagmg.tag.tagbyid(req.query.id, (result) => {
		res.send(result);
	});
}

exports.gettagcount = (req,res)  => {
	$.proxy_tagmg.tag.tagcount(null, (result) => {
		res.send(result);
	});
}

exports.postmaketags = (req,res)  => {
	$.proxy_tagmg.tag.maketags(req.body, (result) => {
		res.send(result);
	});
}

exports.posttagsbyids = (req,res)  => {
	$.proxy_tagmg.tag.tagsbyids(req.body, (result) => {
		res.send(result);
	});
}

