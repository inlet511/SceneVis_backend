var sceneID = $("#sceneID").val();
var conditionTypes=[
    "检查泵的状态",
    "确认阀门关闭",
    "关闭阀门",
    "开启阀门",
    "解锁阀门",
    "就地缓慢开启阀门",
    "确认泵正常运行",
    "确认房间门关闭",
    "汇报",
    "携带装备"
];

//生成Option字符串
function GenerateOptionStr(){
    var optionsStr="";
    $.each(conditionTypes,function(i,item){
            optionsStr+=("<option>"+item+"</option>");            
    });
    return optionsStr;
}

$(document).ready(function () {
    $("#submitBasicInfo").click(function () {
        SubmitBasicInfo(sceneID);
    });
    $("#SubmitPreparation").click(function () {
        SubmitPreparation(sceneID);
    });
    $("#SubmitTaskFlow").click(function () {
        SubmitTaskFlow(sceneID);
    });
});

//提交基本信息
function SubmitBasicInfo(id) {
    var sceneName = $("#scenename").val();
    var des = $("#description").val();
    var beginaudio = $("#beginAudio").val();
    $.ajax({
        url: "/admin/scene/" + id,
        type: "PUT",
        dataType: "text",
        data: JSON.stringify({
            "SceneName": sceneName,
            "Description": des,
            "BeginAudio": beginaudio
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (res, status) {
            $("#exampleModal").modal('show');
        }
    });
}

//刷新涉及到的操作
function RefreshActionsInvoled(id) {
    $.get("/scene/" + id, function (result) {

        //防止和后端模板冲突
        _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

        var actions = result.Preparation.ActionsInvolved;
        var compiled = _.template(
            '<li class="list-group-item"><a href="#actions" onclick="DeleteAction(this)" class="badge badge-danger">X</a>&nbsp;&nbsp;<span>{{item}}</span></li>'
        );

        //先清空
        $("#actionsInvolved").html("");

        //再逐个添加
        for (let i = 0; i < actions.length; i++) {
            $("#actionsInvolved").append(
                compiled({
                    'item': actions[i]
                })
            );
        }
    });
}

//初始化涉及到的操作
RefreshActionsInvoled(sceneID);

//增加一个涉及到的操作
function AddAction() {
    var newActionStr = $("#addActionInvolved").val();
    var item =
        '<li class="list-group-item"><a href="#actions" onclick="DeleteAction(this)" class="badge badge-danger">X</a>&nbsp;&nbsp;<span>' +
        newActionStr + '</span></li>'
    $("#actionsInvolved").append(item);
    $("#addActionInvolved").val("");
}

//删除一个涉及到的操作(不真正提交数据库)
function DeleteAction(item) {
    $(item).parent().remove();
}

//提交准备
function SubmitPreparation(id) {
    var timeLimit = $("#prepare_timeLimit").val();
    var score = $("#prepare_score").val();
    var actions = [];

    for (let i = 0, count = $("#actionsInvolved").children().length; i < count; i++) {
        actions.push($("#actionsInvolved li:eq(" + i + ") span").html());
    }

    $.ajax({
        url: "/admin/scene/preparation/" + id,
        type: "PUT",
        dataType: "text",
        data: JSON.stringify({
            "TimeLimit": timeLimit,
            "ScoreWeight": score,
            "ActionsInvolved": actions
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (res, status) {
            RefreshActionsInvoled(sceneID);
            $("#exampleModal").modal('show');
        }
    })
}

//刷新所有流程
function RefreshAllWorkFlow(id){
    $.get("/scene/" + id, function (result){
        //防止和后端模板冲突
        _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

        var taskflows = result.TaskFlow;

        var rawString = "";
        //先清空内容
        $("#accordion").html("");
        for(let i=0;i<taskflows.length;i++)
        {
            rawString += 
            '<div class="card" id="card'+i+'">'+
                '<div class="card-header" id="heading'+i+'">'+
                    '<h5 class="mb-0">'+
                        '<a href="#sceneWorkFlow" class="badge badge-danger" onclick="DeleteWorkFlow(this)">X</a>&nbsp;&nbsp;<a href="#flow'+i+'" class="badge badge-success" onclick="MoveUp(this)">▲</a>&nbsp;&nbsp;<a href="#flow'+i+'" class="badge badge-success" onclick="MoveDown(this)">▼</a>'+
                        '<button class="btn btn-link" type="button" name="flow'+i+'" data-toggle="collapse" data-target="#collapse'+i+'" aria-expanded="false" aria-controls="collapse'+i+'">'+
                            taskflows[i].Order+
                        '</button>'+
                    '</h5>'+
                '</div>'+
                '<div id="collapse'+i+'" class="collapse" aria-labelledby="heading'+i+'" data-parent="#accordion">'+
                    '<div class="card-body">'+
                        '<div class="mb-3">'+
                            '<label>分值权重</label>'+
                            '<input class="form-control" id="tf_scoreweight" type="text" value="'+taskflows[i].ScoreWeight+'">'+
                        '</div>'+
                        '<div class="mb-3">'+
                            '<label>指令</label>'+
                            '<input class="form-control" id="tf_order" type="text" value="'+taskflows[i].Order+'">'+
                        '</div>'+
                        '<div class="mb-3">'+
                            '<label>指令音频</label>'+
                            '<input class="form-control" id="tf_orderaudio" type="text" value="'+taskflows[i].OrderAudio+'">'+
                        '</div>'+
                        '<div class="mb-3">'+
                            '<label>汇报</label>'+
                            '<input class="form-control" id="tf_report" type="text" value="'+taskflows[i].Report+'">'+
                        '</div>'+
                        '<div class="mb-3">'+
                            '<label>错误汇报语句1</label>'+
                            '<input class="form-control" id="tf_wrongreport1" type="text" value="'+taskflows[i].WrongReport1+'">'+
                        '</div>'+
                        '<div class="mb-3">'+
                            '<label>错误汇报语句2</label>'+
                            '<input class="form-control" id="tf_wrongreport2" type="text" value="'+taskflows[i].WrongReport2+'">'+
                        '</div>'+
                        '<div class="mb-3">'+
                            '<label>时间限定(秒)</label>'+
                            '<input class="form-control" id="tf_timelimit" type="text" value="'+taskflows[i].TimeLimit+'">'+
                        '</div>'+
                        '<div class="mb-3">'+
                            '<label>新增条件</label>'+
                            '<div class="form-row">'+
                                '<div class="form-group col-md-5" id="conditionTypeSelect">'+
                                    '<label for="inputState">条件类型</label>'+
                                    '<select class="form-control">'+
                                        GenerateOptionStr()+
                                    '</select>'+
                                '</div>'+
                                '<div class="form-group col-md-5" id="inputID">'+                        
                                    '<label for="inputID">对象ID</label>'+
                                    '<input type="text" class="form-control">'+
                                '</div>'+
                                '<div class="form-group col-md-2">'+
                                    '<label for="inputID">操作</label>'+
                                    '<button type="button" class="btn btn-success form-control" onclick="AddCondition(this)">添加条件</button>'+
                                '</div>'+
                            '</div>'+
                            '<label>条件列表</label>'+
                            '<div class="conditionContainer">';    


            var conditionCount = taskflows[i].Conditions.length;

            for(let j=0; j<conditionCount;j++)
            {
                var conditionTemplate =  
                '<div class="form-row">'+
                    '<div class="col-md-5" id="conditionTypeSelect">'+
                        '<input type="text" value="'+taskflows[i].Conditions[j].Type+'" class="form-control" readonly></input>'+
                    '</div>'+                            
                    '<div class="col-md-5" id="inputID">'+
                        '<input type="text" class="form-control" value="'+taskflows[i].Conditions[j].ItemNo+'"></input>'+
                    '</div>'+
                    '<div class="col-md-2">'+
                        '<button type="button" class="btn btn-danger form-control" onclick="DeleteCondition(this)">删除</button>'+
                    '</div>'+
                '</div>';
                rawString+= conditionTemplate;
            }      
            rawString+='</div></div></div></div></div>';     
        }

        $("#accordion").append(rawString);
    });
}

RefreshAllWorkFlow(sceneID);

//添加流程
function AddWorkFlow(button) {
    var childrenCount = $("#accordion").children().length;
    var order = $("#newTaskFlow-input").val();
    var newTaskFlow = 
        '<div class="card" id="card'+childrenCount+'">'+
            '<div class="card-header" id="heading'+childrenCount+'">'+
                '<h5 class="mb-0">'+
                    '<a href="#sceneWorkFlow" class="badge badge-danger" onclick="DeleteWorkFlow(this)">X</a>&nbsp;&nbsp;<a href="#flow'+childrenCount+'" class="badge badge-success" onclick="MoveUp(this)">▲</a>&nbsp;&nbsp;<a href="#flow'+childrenCount+'" class="badge badge-success" onclick="MoveDown(this)">▼</a>'+
                    '<button class="btn btn-link" type="button" name="flow'+childrenCount+'" data-toggle="collapse" data-target="#collapse'+childrenCount+'" aria-expanded="false" aria-controls="collapse'+childrenCount+'">'+
                        order+
                    '</button>'+
                '</h5>'+
            '</div>'+
            '<div id="collapse'+childrenCount+'" class="collapse" aria-labelledby="heading'+childrenCount+'" data-parent="#accordion">'+
                '<div class="card-body">'+
                    '<div class="mb-3">'+
                        '<label>分值权重</label>'+
                        '<input class="form-control" id="tf_scoreweight" type="text" value="1">'+
                    '</div>'+
                    '<div class="mb-3">'+
                        '<label>指令</label>'+
                        '<input class="form-control" id="tf_order" type="text" value="'+order+'">'+
                    '</div>'+
                    '<div class="mb-3">'+
                        '<label>指令音频</label>'+
                        '<input class="form-control" id="tf_orderaudio" type="text" value="">'+
                    '</div>'+
                    '<div class="mb-3">'+
                        '<label>汇报</label>'+
                        '<input class="form-control" id="tf_report" type="text" value="">'+
                    '</div>'+
                    '<div class="mb-3">'+
                        '<label>错误汇报1</label>'+
                        '<input class="form-control" id="tf_wrongreport1" type="text" value="">'+
                    '</div>'+
                    '<div class="mb-3">'+
                        '<label>错误汇报2</label>'+
                        '<input class="form-control" id="tf_wrongreport2" type="text" value="">'+
                    '</div>'+
                    '<div class="mb-3">'+
                        '<label>时间限定(秒)</label>'+
                        '<input class="form-control" id="tf_timelimit" type="text" value="300">'+
                    '</div>'+
                    '<div class="mb-3">'+
                        '<label>新增条件</label>'+
                        '<div class="form-row">'+
                            '<div class="form-group col-md-5" id="conditionTypeSelect">'+
                                '<label for="inputState">条件类型</label>'+
                                '<select class="form-control">'+
                                    GenerateOptionStr()+
                                '</select>'+
                            '</div>'+
                            '<div class="form-group col-md-5" id="inputID">'+                  
                                '<label for="inputID">对象ID</label>'+
                                '<input type="text" class="form-control">'+
                            '</div>'+
                            '<div class="form-group col-md-2">'+
                                '<label for="inputID">操作</label>'+
                                '<button type="button" class="btn btn-success form-control" onclick="AddCondition(this)">添加条件</button>'+
                            '</div>'+
                        '</div>'+
                        '<label>条件列表</label>'+
                        '<div class="conditionContainer">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';

    $("#accordion").append(newTaskFlow);

    
    
}

//上移流程
function MoveUp(item){
    var currentCard = $(item).parents(".card");
    if(currentCard.prev())
    {
        currentCard.prev().before(currentCard);
    }
}

//下移流程
function MoveDown(item){
    var currentCard = $(item).parents(".card");
    if(currentCard.next())
    {
        currentCard.next().after(currentCard);
    }
}

//删除一个流程
function DeleteWorkFlow(item){
    $(item).parents(".card").remove();
}

//提交流程
function SubmitTaskFlow(id) {
    var tasks = [];
    var taskFlowCount = $("#accordion").children().length;
    $("#accordion").children().each(function(){
        var conditions = [];
        var conditionContainer = $(this).find(".conditionContainer");
        for(let i=0;i<conditionContainer.children().length;i++)
        {
            conditions.push({
                Type:conditionContainer.children().eq(i).find("#conditionTypeSelect input").val(),
                ItemNo:conditionContainer.children().eq(i).find("#inputID input").val()
            });
        }
        tasks.push({
            ScoreWeight:$(this).find("#tf_scoreweight").val(),
            Order:$(this).find("#tf_order").val(),
            OrderAudio:$(this).find("#tf_orderaudio").val(),
            Report:$(this).find("#tf_report").val(),
            WrongReport1:$(this).find("#tf_wrongreport1").val(),
            WrongReport2:$(this).find("#tf_wrongreport2").val(),
            TimeLimit:$(this).find("#tf_timelimit").val(),
            Conditions:conditions
        });
    });
    $.ajax({
        url:"/admin/scene/taskflow/"+id,
        type:"PUT",
        dataType: "text",
        data: JSON.stringify(tasks),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (res, status) {            
            $("#exampleModal").modal('show');
        }
    });
}

//添加条件
function AddCondition(button){
    var conditionType = $(button).parent().siblings("#conditionTypeSelect").children("select").children("option:selected").text();
    var targetID=$(button).parent().siblings("#inputID").children("input").val();
    $(button).parent().parent().siblings(".conditionContainer").append(
        '<div class="form-row">'+
            '<div class="col-md-5" id="conditionTypeSelect">'+
                '<input type="text" value="'+conditionType+'" class="form-control" readonly></input>'+
            '</div>'+                            
            '<div class="col-md-5" id="inputID">'+
                '<input type="text" class="form-control" value="'+targetID+'"></input>'+
            '</div>'+
            '<div class="col-md-2">'+
                '<button type="button" class="btn btn-danger form-control" onclick="DeleteCondition(this)">删除</button>'+
            '</div>'+
        '</div>'
    );
}

//删除条件
function DeleteCondition(button){
    $(button).parent().parent().remove();
}


//Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';

    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');

        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('click', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
