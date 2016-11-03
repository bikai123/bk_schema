<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<section class="content">
		<!-- Small boxes (Stat box) -->
		<div class="row">
			<div class="col-md-12">
				<div class="col-md-2">
					<!-- col-lg-3 col-xs-6 -->
					<!-- small box -->
					<div class="small-box bg-red">
						<div class="inner">
							<h3>60</h3>

							<p>项目总数</p>
						</div>
						<div class="icon">
							<i class="ion ion-bag"></i>
						</div>
						<a href="#" class="small-box-footer">详情 <i
							class="fa fa-arrow-circle-right"></i></a>
					</div>
				</div>
				<div class="col-md-2">
					<!-- col-lg-3 col-xs-6 -->
					<!-- small box -->
					<div class="small-box bg-green">
						<div class="inner">
							<h3>50</h3>

							<p>项目前期</p>
						</div>
						<div class="icon">
							<i class="ion ion-bag"></i>
						</div>
						<a href="#" class="small-box-footer">详情<i
							class="fa fa-arrow-circle-right"></i></a>
					</div>
				</div>
				<!-- ./col -->
				<div class="col-md-2">
					<!-- small box -->
					<div class="small-box bg-yellow">
						<div class="inner">
							<h3>
								20<sup style="font-size: 20px"></sup>
							</h3>

							<p>项目招投标</p>
						</div>
						<div class="icon">
							<i class="ion ion-stats-bars"></i>
						</div>
						<a href="#" class="small-box-footer">详情 <i
							class="fa fa-arrow-circle-right"></i></a>
					</div>
				</div>
				<!-- ./col -->
				<div class="col-md-2">
					<!-- small box -->
					<div class="small-box bg-blue">
						<div class="inner">
							<h3>15</h3>

							<p>项目签订合同</p>
						</div>
						<div class="icon">
							<i class="ion ion-person-add"></i>
						</div>
						<a href="#" class="small-box-footer">详情 <i
							class="fa fa-arrow-circle-right"></i></a>
					</div>
				</div>
				<!-- ./col -->
				<div class="col-md-2">
					<!-- small box -->
					<div class="small-box bg-aqua">
						<div class="inner">
							<h3>10</h3>

							<p>项目施工</p>
						</div>
						<div class="icon">
							<i class="ion ion-pie-graph"></i>
						</div>
						<a href="#" class="small-box-footer">详情 <i
							class="fa fa-arrow-circle-right"></i></a>
					</div>
				</div>
				<div class="col-md-2">
					<!-- small box -->
					<div class="small-box bg-gray">
						<div class="inner">
							<h3>3</h3>

							<p>项目验收</p>
						</div>
						<div class="icon">
							<i class="ion ion-person-add"></i>
						</div>
						<a href="#" class="small-box-footer">详情 <i
							class="fa fa-arrow-circle-right"></i></a>
					</div>
				</div>
			</div>
			<!-- ./col -->
		</div>
		<!-- /.row -->
		<!-- Main row -->
		<div class="row">
			<!-- Left col -->
			<section class="col-lg-7 connectedSortable">
				<!-- Custom tabs (Charts with tabs)-->
				<div class="nav-tabs-custom">
					<!-- Tabs within a box -->
					<ul class="nav nav-tabs pull-right">
						<li class="active"><a href="#revenue-chart" data-toggle="tab">柱状图</a></li>
						<li><a href="#sales-chart" data-toggle="tab">折线图</a></li>
						<li class="pull-left header"><i class="fa fa-inbox"></i> 项目图表</li>
					</ul>
					<div class="tab-content no-padding">
						<!-- Morris chart - Sales -->
						<div class="chart tab-pane active" id="revenue-chart"
							style="position: relative; height: 300px;">
							<img  src="/assets/pages/scripts/node1/12.png"></div>
						

						<div class="chart tab-pane" id="sales-chart"
							style="position: relative; height: 300px;"><img src="/assets/pages/scripts/node1/21.png"></img></div>
					</div>
				</div>


				<!-- Chat box -->
				<!-- <div class="box box-success">
            <div class="box-header">
              <i class="fa fa-comments-o"></i>

              <h3 class="box-title">ÁôÑÔ°å</h3>

              <div class="box-tools pull-right" data-toggle="tooltip" title="Status">
                <div class="btn-group" data-toggle="btn-toggle">
                  <button type="button" class="btn btn-default btn-sm active"><i class="fa fa-square text-green"></i>
                  </button>
                  <button type="button" class="btn btn-default btn-sm"><i class="fa fa-square text-red"></i></button>
                </div>
              </div>
            </div>
            <div class="box-body chat" id="chat-box">
              chat item
              <div class="item">
                <img src="/assets/pages/scripts/dist/img/user4-128x128.jpg" alt="user image" class="online">

                <p class="message">
                  <a href="#" class="name">
                    <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 2:15</small>
                    	ËïÑÞ
                  </a>
                  ²é¿´ÁË¡¶ÐèÇó¹æ¸ñËµÃ÷ÊéV1.1¡·£¬Ã»ÓÐÐÞ¸ÄÎÄµµÄÚÈÝ£¬¾ßÌå½¨Òé²ÎÕÕ¡¶ÆäËû¡·
                </p>
                <div class="attachment">
                  <h4>¸½¼þ:</h4>

                  <p class="filename">
                    	¡¶ÆäËû¡·
                  </p>

                  <div class="pull-right">
                    <button type="button" class="btn btn-primary btn-sm btn-flat">´ò¿ª</button>
                  </div>
                </div>
                /.attachment
              </div>
              /.item

              chat item
              <div class="item">
                <img src="/assets/pages/scripts/dist/img/user2-160x160.jpg" alt="user image" class="offline">

                <p class="message">
                  <a href="#" class="name">
                    <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 5:30</small>
                   	 Ô¬Ò°
                  </a>
                  ¶Ô¡¶ÐèÇó¹æ¸ñËµÃ÷ÊéV1.0¡·µÄ3.2ÓÃ»§½çÃæÐèÇóºÍ6.5ÏµÍ³¹¦ÄÜÃèÊö½øÐÐÁËÐÞ¸Ä£¬²¢ÉÏ´«¡¶ÐèÇó¹æ¸ñËµÃ÷ÊéV1.1¡·£¬Çë´ó¼ÒÏÂÔØ²é¿´¡£
                </p>
                <div class="attachment">
                  <h4>¸½¼þ:</h4>

                  <p class="filename">
                    	¡¶ÐèÇó¹æ¸ñËµÃ÷ÊéV1.1¡·
                  </p>

                  <div class="pull-right">
                    <button type="button" class="btn btn-primary btn-sm btn-flat">Open</button>
                  </div>
                </div>
              </div>
              /.item
            </div>
            /.chat
            <div class="box-footer">
              <div class="input-group">
                <input class="form-control" placeholder="Type message...">

                <div class="input-group-btn">
                  <button type="button" class="btn btn-success"><i class="fa fa-plus"></i></button>
                </div>
              </div>
            </div>
          </div> -->
				<!-- /.box (chat box) -->

				<!-- TO DO List -->

				<!-- /.box -->

				<!-- quick email widget -->


			</section>
			<!-- /.Left col -->
			<!-- right col (We are only adding the ID to make the widgets sortable)-->
			<section class="col-lg-5 connectedSortable">

				<!-- Map box -->
				<div class="box box-primary">
					<div class="box-header">
						<i class="ion ion-clipboard"></i>

						<h3 class="box-title">项目消息</h3>

						<div class="box-tools pull-right">
							<ul class="pagination pagination-sm inline">
								<li><a href="#">&laquo;</a></li>
								<li><a href="#">1</a></li>
								<li><a href="#">2</a></li>
								<li><a href="#">3</a></li>
								<li><a href="#">&raquo;</a></li>
							</ul>
						</div>
					</div>
					<!-- /.box-header -->
					<div class="box-body">
						<ul class="todo-list">
							<li>
								<!-- drag handle --> <span class="handle"> <i
									class="fa fa-ellipsis-v"></i> <i class="fa fa-ellipsis-v"></i>
							</span> <!-- checkbox --> <input type="checkbox" value=""> <!-- todo text -->
								<span class="text">2016年8月21日下午2点参加项目会议</span> <!-- Emphasis label --> <small
								class="label label-danger"><i class="fa fa-clock-o"></i>
									2 mins</small> <!-- General tools such as edit or delete-->
								<div class="tools">
									<i class="fa fa-edit"></i> <i class="fa fa-trash-o"></i>
								</div>
							</li>
							<li><span class="handle"> <i class="fa fa-ellipsis-v"></i>
									<i class="fa fa-ellipsis-v"></i>
							</span> <input type="checkbox" value=""> <span class="text">根据调研结果编写《项目需求设计书》</span>
								<small class="label label-info"><i class="fa fa-clock-o"></i>
									4 hours</small>
								<div class="tools">
									<i class="fa fa-edit"></i> <i class="fa fa-trash-o"></i>
								</div></li>
							<li><span class="handle"> <i class="fa fa-ellipsis-v"></i>
									<i class="fa fa-ellipsis-v"></i>
							</span> <input type="checkbox" value=""> <span class="text">准备标书和投标所需的材料</span>
								<small class="label label-warning"><i
									class="fa fa-clock-o"></i> 1 day</small>
								<div class="tools">
									<i class="fa fa-edit"></i> <i class="fa fa-trash-o"></i>
								</div></li>
							<li><span class="handle"> <i class="fa fa-ellipsis-v"></i>
									<i class="fa fa-ellipsis-v"></i>
							</span> <input type="checkbox" value=""> <span class="text">随客户前往即墨调研</span>
								<small class="label label-success"><i
									class="fa fa-clock-o"></i> 3 days</small>
								<div class="tools">
									<i class="fa fa-edit"></i> <i class="fa fa-trash-o"></i>
								</div></li>
							<li><span class="handle"> <i class="fa fa-ellipsis-v"></i>
									<i class="fa fa-ellipsis-v"></i>
							</span> <input type="checkbox" value=""> <span class="text">今天下午2点参与项目会议</span>
								<small class="label label-primary"><i
									class="fa fa-clock-o"></i> 1 week</small>
								<div class="tools">
									<i class="fa fa-edit"></i> <i class="fa fa-trash-o"></i>
								</div></li>
							<li><span class="handle"> <i class="fa fa-ellipsis-v"></i>
									<i class="fa fa-ellipsis-v"></i>
							</span> <input type="checkbox" value=""> <span class="text">与监理联系，协商验收相关事宜</span>
								<small class="label label-default"><i
									class="fa fa-clock-o"></i> 1 month</small>
								<div class="tools">
									<i class="fa fa-edit"></i> <i class="fa fa-trash-o"></i>
								</div></li>
								<li><span class="handle"> <i class="fa fa-ellipsis-v"></i>
									<i class="fa fa-ellipsis-v"></i>
							</span> <input type="checkbox" value=""> <span class="text">编写项目总结报告</span>
								<small class="label label-default"><i
									class="fa fa-clock-o"></i> 1 month</small>
								<div class="tools">
									<i class="fa fa-edit"></i> <i class="fa fa-trash-o"></i>
								</div></li>
						</ul>
					</div>
					<!-- /.box-body -->
				</div>
				<!-- /.box -->

				<!-- solid sales graph -->
				<!-- <div class="box box-info">
            <div class="box-header">
              <i class="fa fa-envelope"></i>

              <h3 class="box-title">Õ¾ÄÚÐÅ</h3>
              tools box
              <div class="pull-right box-tools">
                <button type="button" class="btn btn-info btn-sm" data-widget="remove" data-toggle="tooltip" title="Remove">
                  <i class="fa fa-times"></i></button>
              </div>
              /. tools
            </div>
            <div class="box-body">
              <form action="#" method="post">
                <div class="form-group">
                  <input type="email" class="form-control" name="emailto" placeholder="·¢ËÍ¸ø:">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" name="subject" placeholder="±êÌâ£º">
                </div>
                <div>
                  <textarea class="textarea" placeholder="ÄÚÈÝ£º" style="width: 100%; height: 125px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
                </div>
              </form>
            </div>
            <div class="box-footer clearfix">
              <button type="button" class="pull-right btn btn-default" id="sendEmail">·¢ËÍ
                <i class="fa fa-arrow-circle-right"></i></button>
            </div>
          </div> -->
				<!-- /.box -->

				<!-- /.box -->

			</section>
			<!-- right col -->
		</div>
		<!-- /.row (main row) -->
	</section>
	<!-- /.content -->
	<!--   </div> -->
	<!-- /.content-wrapper -->


	<!-- Control Sidebar -->
	<aside class="control-sidebar control-sidebar-dark">
		<!-- Create the tabs -->
		<ul class="nav nav-tabs nav-justified control-sidebar-tabs">
			<li><a href="#control-sidebar-home-tab" data-toggle="tab"><i
					class="fa fa-home"></i></a></li>
			<li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i
					class="fa fa-gears"></i></a></li>
		</ul>
		<!-- Tab panes -->
		<!-- <div class="tab-content">
      Home tab content
      <div class="tab-pane" id="control-sidebar-home-tab">
        <h3 class="control-sidebar-heading">Recent Activity</h3>
        <ul class="control-sidebar-menu">
          <li>
            <a href="javascript:void(0)">
              <i class="menu-icon fa fa-birthday-cake bg-red"></i>

              <div class="menu-info">
                <h4 class="control-sidebar-subheading">Langdon's Birthday</h4>

                <p>Will be 23 on April 24th</p>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i class="menu-icon fa fa-user bg-yellow"></i>

              <div class="menu-info">
                <h4 class="control-sidebar-subheading">Frodo Updated His Profile</h4>

                <p>New phone +1(800)555-1234</p>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i class="menu-icon fa fa-envelope-o bg-light-blue"></i>

              <div class="menu-info">
                <h4 class="control-sidebar-subheading">Nora Joined Mailing List</h4>

                <p>nora@example.com</p>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i class="menu-icon fa fa-file-code-o bg-green"></i>

              <div class="menu-info">
                <h4 class="control-sidebar-subheading">Cron Job 254 Executed</h4>

                <p>Execution time 5 seconds</p>
              </div>
            </a>
          </li>
        </ul>
        /.control-sidebar-menu

        <h3 class="control-sidebar-heading">Tasks Progress</h3>
        <ul class="control-sidebar-menu">
          <li>
            <a href="javascript:void(0)">
              <h4 class="control-sidebar-subheading">
                Custom Template Design
                <span class="label label-danger pull-right">70%</span>
              </h4>

              <div class="progress progress-xxs">
                <div class="progress-bar progress-bar-danger" style="width: 70%"></div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <h4 class="control-sidebar-subheading">
                Update Resume
                <span class="label label-success pull-right">95%</span>
              </h4>

              <div class="progress progress-xxs">
                <div class="progress-bar progress-bar-success" style="width: 95%"></div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <h4 class="control-sidebar-subheading">
                Laravel Integration
                <span class="label label-warning pull-right">50%</span>
              </h4>

              <div class="progress progress-xxs">
                <div class="progress-bar progress-bar-warning" style="width: 50%"></div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <h4 class="control-sidebar-subheading">
                Back End Framework
                <span class="label label-primary pull-right">68%</span>
              </h4>

              <div class="progress progress-xxs">
                <div class="progress-bar progress-bar-primary" style="width: 68%"></div>
              </div>
            </a>
          </li>
        </ul>
        /.control-sidebar-menu

      </div>
      /.tab-pane
      Stats tab content
      <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
      /.tab-pane
      Settings tab content
      <div class="tab-pane" id="control-sidebar-settings-tab">
        <form method="post">
          <h3 class="control-sidebar-heading">General Settings</h3>

          <div class="form-group">
            <label class="control-sidebar-subheading">
              Report panel usage
              <input type="checkbox" class="pull-right" checked>
            </label>

            <p>
              Some information about this general settings option
            </p>
          </div>
          /.form-group

          <div class="form-group">
            <label class="control-sidebar-subheading">
              Allow mail redirect
              <input type="checkbox" class="pull-right" checked>
            </label>

            <p>
              Other sets of options are available
            </p>
          </div>
          /.form-group

          <div class="form-group">
            <label class="control-sidebar-subheading">
              Expose author name in posts
              <input type="checkbox" class="pull-right" checked>
            </label>

            <p>
              Allow the user to show his name in blog posts
            </p>
          </div>
          /.form-group

          <h3 class="control-sidebar-heading">Chat Settings</h3>

          <div class="form-group">
            <label class="control-sidebar-subheading">
              Show me as online
              <input type="checkbox" class="pull-right" checked>
            </label>
          </div>
          /.form-group

          <div class="form-group">
            <label class="control-sidebar-subheading">
              Turn off notifications
              <input type="checkbox" class="pull-right">
            </label>
          </div>
          /.form-group

          <div class="form-group">
            <label class="control-sidebar-subheading">
              Delete chat history
              <a href="javascript:void(0)" class="text-red pull-right"><i class="fa fa-trash-o"></i></a>
            </label>
          </div>
          /.form-group
        </form>
      </div>
      /.tab-pane
    </div> -->
	</aside>