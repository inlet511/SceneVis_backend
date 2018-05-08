
<div class="card">
    <div class="card-header" id="heading1">
        <h5 class="mb-0">
            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapse1">

            </button>
        </h5>
    </div>

    <div id="collapse1" class="collapse" aria-labelledby="heading1" data-parent="#accordion">
        <div class="card-body">

            <div class="mb-3">
                <label>分值权重</label>
                <input class="form-control" id="tf_scoreweight" type="text" value="<%=scene.TaskFlow.ScoreWeight%>">
            </div>

            <div class="mb-3">
                <label>指令</label>
                <input class="form-control" id="tf_order" type="text" value="<%=scene.TaskFlow.Order%>">
            </div>

            <div class="mb-3">
                <label>指令音频</label>
                <input class="form-control" id="tf_orderaudio" type="text" value="<%=scene.TaskFlow.OrderAudio%>">
            </div>

            <div class="mb-3">
                <label>汇报</label>
                <input class="form-control" id="tf_report" type="text" value="<%=scene.TaskFlow.Report%>">
            </div>

            <div class="mb-3">
                <label>时间限定(秒)</label>
                <input class="form-control" id="tf_timelimit" type="text" value="<%=scene.TaskFlow.TimeLimit%>">
            </div>

            <div class="mb-3">
                <label>新增条件</label>

                <div class="form-row">
                    <div class="form-group col-md-5">
                        <label for="inputState">条件类型</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div class="form-group col-md-5">
                        <label for="inputCity">对象ID</label>
                        <input type="text" class="form-control" id="inputCity">
                    </div>
                    <div class="form-group col-md-2">
                        <label for="inputCity">操作</label>
                        <button type="button" class="btn btn-success form-control">添加条件</button>
                    </div>
                </div>
                <label>条件列表</label>
                <div class="form-row">
                    <div class="col-md-5">
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div class=" col-md-5">
                        <input type="text" class="form-control" id="inputCity"></input>
                    </div>
                    <div class=" col-md-2">

                        <button type="button" class="btn btn-danger form-control">删除</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>