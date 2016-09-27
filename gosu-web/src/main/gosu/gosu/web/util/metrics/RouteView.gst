<%@ params(filter : MetricsFilter, id : String) %>
<% var timer = filter.Metrics.timer(id) %>
<script src="http://code.highcharts.com/highcharts.js"></script>
<script src="http://code.highcharts.com/highcharts-more.js"></script>
<script src="http://code.highcharts.com/modules/exporting.js"></script>
<div>
  <h2 class="page-title">Route Information</h2>
</div>
<% if(timer.Count == 0) { %>
<div class="inset-8">
    <div class="alert alert-danger alert-dismissable">
      <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
      <strong>Attention: </strong> it appears that this is not a valid URL, or it has not yet been used.
    </div>
</div>
<% } %>
<li data-range='' style='visibility:hidden;'></li>
<div id='wrapper'>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>
          URL
        </th>
        <th>
          Request Count
        </th>
        <th>
          Fifteen Minute Rate
        </th>
        <th>
          Min Time
        </th>
        <th>
          Median Time
        </th>
        <th>
          Max Time
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          ${id.replace(MetricsRunner.TimerDelimiter, '')}
        </td>
        <td>
          ${timer.Count}
        </td>
        <td>
          ${timer.FifteenMinuteRate}
        </td>
        <td>
          ${String.format("%.5g%n", {timer.Snapshot.Min/(1e9)}) + ' seconds'}
        </td>
        <td>
          ${String.format("%.5g%n", {timer.Snapshot.Median/(1e9)}) + ' seconds'}
        </td>
        <td>
          ${String.format("%.5g%n", {timer.Snapshot.Max/(1e9)}) + ' seconds'}
        </td>
     </tr>
    </tbody>
  </table>
</div>
<div id="container" style="min-width: 310px; height: 600px; margin: 0 auto; padding:20px;"></div>
<script>
  $(function () {
    $('#container').highcharts({
        chart: {
            type: 'columnrange'
        },
        title: {
            text: 'Range in Execution Time by Quartile'
        },
        xAxis: {
            categories: ['Q1', 'Q2', 'Q3', 'Q4'],
            title : {
                text: 'Quartile'
            }
        },
        yAxis: {
            title: {
                text: 'Time (Seconds)'
            }
        },
        tooltip: {
            valueSuffix: ' Seconds'
        },
        plotOptions: {
            columnrange: {
              dataLabels: {
                enabled: true,
                formatter: function () {
                  return this.y;
                }
              }
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Time Range',
            data: ${timer.Snapshot.quartileRange().toString()}
        }]
    });
  });
</script>