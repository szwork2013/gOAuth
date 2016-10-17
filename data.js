var roles = [
    {
        id:'3b7c2d81-aa23-4025-85a7-44c28a472718',
        name:'admin',
        desc:'后台管理员权限',
        isactive:'0'
    },
    {
        id:'26fa0ec4-60ea-474f-a2cb-842a1319bd14',
        name:'new',
        desc:'新建用户',
        isactive:'0'
    },
    {
        id:'f70a2e61-b106-4678-98de-7c092c7a8852',
        name:'verified',
        desc:'认证用户',
        isactive:'0'
    }
];

var resources = [
    {
        id:'0eaad0ac-3a5c-4382-8804-b093cc16287b',
        name:'myshow',
        desc:'我的展示',
        action:'/show/exhibition-1.html',
        type:'menu',
        parentid:'',
        value: 2,
        isactive: '0'
    },
    {
        id:'7ee761de-3357-474a-9fd7-8468a90a59f7',
        name:'myshowlist',
        desc:'我的展示查看',
        action:'/show/exhibition-1.html',
        type:'action',
        parentid:'0eaad0ac-3a5c-4382-8804-b093cc16287b',
        value: 2,
        isactive: '0'
    },
    {
        id:'fcf133cf-dfd7-45ae-96de-cb4fba3e4eef',
        name:'myshowedit',
        desc:'我的展示修改',
        action:'/show/exhibition-1.html',
        type:'action',
        parentid:'0eaad0ac-3a5c-4382-8804-b093cc16287b',
        value: 2,
        isactive: '0'
    },
    {
        id:'1610f1d8-b1e2-4c8c-be5f-9ada3255c1db',
        name:'myshowpublish',
        desc:'我的展示发布',
        action:'/show/exhibition-1.html',
        type:'action',
        parentid:'0eaad0ac-3a5c-4382-8804-b093cc16287b',
        value: 2,
        isactive: '0'
    },
    {
        id:'52a50027-8cd3-4eb9-a106-ae4bf05a3a87',
        name:'myshowoos',
        desc:'我的展示下架',
        action:'/show/exhibition-1.html',
        type:'action',
        parentid:'0eaad0ac-3a5c-4382-8804-b093cc16287b',
        value: 2,
        isactive: '0'
    },
    {
        id:'a73864b3-6b89-407a-bb05-f66f1da9cc40',
        name:'mypatents',
        desc:'我的专利',
        action:'/show/exhibition-2.html',
        type:'menu',
        parentid:'',
        value: 4,
        isactive: '0'
    },
    {
        id:'1dd2c242-6545-41cb-a018-5f35167e698b',
        name:'mytransactions',
        desc:'我的交易',
        action:'/show/exhibition-3.html',
        type:'menu',
        parentid:'',
        value: 8,
        isactive: '0'
    },
    {
        id:'13c1bda9-1073-4f7f-a17b-6f360b9d6f98',
        name:'mytranslist',
        desc:'我的交易查看',
        action:'/show/exhibition-3.html',
        type:'action',
        parentid:'1dd2c242-6545-41cb-a018-5f35167e698b',
        value: 8,
        isactive: '0'
    },
    {
        id:'d5e5f0e2-6749-446b-a5bc-aa780d3ef33a',
        name:'trusteeship',
        desc:'股权托管',
        action:'/show/exhibition-4.html',
        type:'menu',
        parentid:'',
        value: 16,
        isactive: '0'
    },
    {
        id:'e6c58811-4620-4c6b-96d6-514797763236',
        name:'custmg',
        desc:'客户管理',
        action:'/show/exhibition-5.html',
        type:'menu',
        parentid:'',
        value: 1,
        isactive: '0'
    },
    {
        id:'5ae45217-f30f-42bd-8929-e7579af21488',
        name:'custlist',
        desc:'客户列表',
        action:'/show/exhibition-5.html',
        type:'action',
        parentid:'e6c58811-4620-4c6b-96d6-514797763236',
        value: 1,
        isactive: '0'
    },
    {
        id:'699ac9f6-6314-4936-b62e-8948f7795532',
        name:'custadd',
        desc:'添加客户',
        action:'/show/exhibition-5.html',
        type:'action',
        parentid:'e6c58811-4620-4c6b-96d6-514797763236',
        value: 1,
        isactive: '0'
    },
    {
        id:'5d0851e9-00a1-4b6c-af3c-ad68c09f72c8',
        name:'custupdate',
        desc:'客户信息修改',
        action:'/show/exhibition-5.html',
        type:'action',
        parentid:'e6c58811-4620-4c6b-96d6-514797763236',
        value: 1,
        isactive: '0'
    },
    {
        id:'dc43faf3-c163-468b-b822-42c5c666c48f',
        name:'custdelete',
        desc:'客户信息修改',
        action:'/show/exhibition-5.html',
        type:'action',
        parentid:'e6c58811-4620-4c6b-96d6-514797763236',
        value: 1,
        isactive: '0'
    },
    {
        id:'5026c140-0171-4709-a775-c35f5e3b0373',
        name:'custinactive',
        desc:'客户冻结',
        action:'/show/exhibition-5.html',
        type:'action',
        parentid:'e6c58811-4620-4c6b-96d6-514797763236',
        value: 1,
        isactive: '0'
    },
    {
        id:'cf1f7f1d-3d90-4beb-8cf4-e7ab61db69fc',
        name:'custactive',
        desc:'客户解冻',
        action:'/show/exhibition-5.html',
        type:'action',
        parentid:'e6c58811-4620-4c6b-96d6-514797763236',
        value: 1,
        isactive: '0'
    },
    {
        id:'ce3bb24d-0d9b-495a-9d7a-12ea44afd47f',
        name:'custverify',
        desc:'客户认证',
        action:'/show/exhibition-5.html',
        type:'action',
        parentid:'e6c58811-4620-4c6b-96d6-514797763236',
        value: 1,
        isactive: '0'
    },
    {
        id:'8a2f52be-9e45-4d0d-a2d4-a1394de9b7a9',
        name:'rolemg',
        desc:'角色管理',
        action:'/show/exhibition-5.html',
        type:'menu',
        parentid:'',
        value: 1,
        isactive: '0'
    },
    {
        id:'d01d402a-23f1-4820-9513-a63a3d1daad7',
        name:'rolemg',
        desc:'角色添加',
        action:'/show/exhibition-5.html',
        type:'action',
        parentid:'8a2f52be-9e45-4d0d-a2d4-a1394de9b7a9',
        value: 1,
        isactive: '0'
    },
    {
        id:'5d8341ec-37e7-42f9-a0c1-0f34d696a53d',
        name:'roleedit',
        desc:'角色修改',
        action:'/show/exhibition-5.html',
        type:'action',
        parentid:'8a2f52be-9e45-4d0d-a2d4-a1394de9b7a9',
        value: 1,
        isactive: '0'
    },
    {
        id:'0ec2a872-225b-4789-b510-e81cc0169be9',
        name:'rolelist',
        desc:'角色查看',
        action:'/show/exhibition-5.html',
        type:'action',
        parentid:'8a2f52be-9e45-4d0d-a2d4-a1394de9b7a9',
        value: 1,
        isactive: '0'
    },
    {
        id:'5fbb09a2-b55a-4e45-b0ad-0a09c8d5d409',
        name:'roledelete',
        desc:'角色删除',
        action:'/show/exhibition-5.html',
        type:'action',
        parentid:'8a2f52be-9e45-4d0d-a2d4-a1394de9b7a9',
        value: 1,
        isactive: '0'
    },
    {
        id:'be42fc40-b2a7-41d9-bb12-55dbbca1b971',
        name:'resourcemg',
        desc:'资源管理',
        action:'/show/exhibition-5.html',
        type:'menu',
        parentid:'',
        value: 1,
        isactive: '0'
    },
    {
        id:'4534461d-36ce-4341-9b62-10ee681da55b',
        name:'resourcelist',
        desc:'资源查看',
        action:'/show/exhibition-5.html',
        type:'action',
        parentid:'be42fc40-b2a7-41d9-bb12-55dbbca1b971',
        value: 1,
        isactive: '0'
    }, 
    {
        id:'4534461d-36ce-4341-9b62-10ee681da55b',
        name:'resourcedelete',
        desc:'资源删除',
        action:'/show/exhibition-5.html',
        type:'action',
        parentid:'be42fc40-b2a7-41d9-bb12-55dbbca1b971',
        value: 1,
        isactive: '0'
    }, 
    {
        id:'13e5e157-545e-4868-844f-478b3e6aa868',
        name:'resourceedit',
        desc:'资源修改',
        action:'/show/exhibition-5.html',
        type:'action',
        parentid:'be42fc40-b2a7-41d9-bb12-55dbbca1b971',
        value: 1,
        isactive: '0'
    }, 
    {
        id:'8c0e55b2-a5be-48ee-8a56-f24eae0593c4',
        name:'resourceadd',
        desc:'资源添加',
        action:'/show/exhibition-5.html',
        type:'action',
        parentid:'be42fc40-b2a7-41d9-bb12-55dbbca1b971',
        value: 1,
        isactive: '0'
    }
];

var users = [
    {
        id:'ecb3a193-e53e-4910-8e02-0269931a7093',
        name:'13999999999',
        password:'123456',
        desc:'后台管理员权限',
        status:'0'
    },
    {
        id:'19458182-f664-4a8e-b3ed-f5b45a3f51a1',
        name:'18888888888',
        mobile:'18888888888',
        password:'123456',
        desc:'普通用户',
        status:'0'
    },
    {
        id:'642f2230-d9ef-4c78-ac17-64d731649866',
        name:'18999999999',
        mobile:'18999999999',
        password:'123456',
        desc:'普通用户',
        status:'0'
    }
];

/*role:resource:roleid*/
var role_resources =
[
    {
        id:'3b7c2d81-aa23-4025-85a7-44c28a472718',//admin
        resources:[
            'e6c58811-4620-4c6b-96d6-514797763236',
            '8a2f52be-9e45-4d0d-a2d4-a1394de9b7a9',
            'e6c58811-4620-4c6b-96d6-514797763236'
        ]
    },
    {
        id:'26fa0ec4-60ea-474f-a2cb-842a1319bd14',//new
        resources:[
            '0eaad0ac-3a5c-4382-8804-b093cc16287b'
        ]
    },
    {
        id:'f70a2e61-b106-4678-98de-7c092c7a8852',//verified
        resources:[
            '0eaad0ac-3a5c-4382-8804-b093cc16287b',
            '7ee761de-3357-474a-9fd7-8468a90a59f7',
            '1dd2c242-6545-41cb-a018-5f35167e698b'
        ]
    }
]

/*user:role:userid*/
var user_roles =
[
    {
        id:'ecb3a193-e53e-4910-8e02-0269931a7093',
        roles:[
            '3b7c2d81-aa23-4025-85a7-44c28a472718'
        ]
    },
    {
        id:'19458182-f664-4a8e-b3ed-f5b45a3f51a1',
        roles:[
            '26fa0ec4-60ea-474f-a2cb-842a1319bd14'
        ]
    },
    {
        id:'642f2230-d9ef-4c78-ac17-64d731649866',
        roles:[
            '26fa0ec4-60ea-474f-a2cb-842a1319bd14',
            'f70a2e61-b106-4678-98de-7c092c7a8852'
        ]
    }
]

/*user:role:userid*/
var user_resources =
    {
        id:'3b7c2d81-aa23-4025-85a7-44c28a472718',
        resources:[
            '',
            ''
        ]
    }

module.exports = {
    users:users,
    roles:roles,
    resources:resources,
    role_resources:role_resources,
    user_roles:user_roles,
    user_resources:user_resources
}
