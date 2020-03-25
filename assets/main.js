$(document).ready(function() {
  $.ajaxSetup({
    url: "https://coronavirus-monitor.p.rapidapi.com/coronavirus",
    headers: {
      "x-rapidapi-key": "bbfcbcba07msh67e8ad681aab5dep1e5f13jsna9be297f9366"
    }
  });
  $.when(
    // Get total stats
    $.get(
      "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php"
    ),

    // Get stats by country
    $.get(
      "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php"
    )
  ).then(function(totalStats, byCountry) {
    console.log(totalStats[0], byCountry);
    $(".loader").hide();
    // Extract data
    const data = JSON.parse(byCountry[0]);
    const total = JSON.parse(totalStats[0]);
    const statsByCountry = data.countries_stat;
    const lastUpdatedAt = data.statistic_taken_at;
    var tr = "";
    // var tr = stats.map(stat => stat.country_name);
    tr += statsByCountry.map(
      stat =>
        `<tr>
									<th> ${stat.country_name}</th>
									<td>${stat.cases} </td>
									<td class="new cases">+${stat.new_cases}</td>
									<td>${stat.deaths}</td>
									<td class="new deaths">+${stat.new_deaths}</td>
									<td>${stat.total_recovered}</td>
									<td>${stat.active_cases}</td>
									<td>${stat.serious_critical}</td>
									<td>${stat.total_cases_per_1m_population}</td>
								</tr>`
    );
    // console.log(tr);
    // Set stats
    $("tbody").html(tr);
    $(".total .cases").text(total.total_cases);
    $(".total .deaths").text(total.total_deaths);
    $(".total .recovered").text(total.total_recovered);
    $("#last-updated").text(
      "Last updated: " + new Date(lastUpdatedAt).toUTCString()
    );

    $("#main_table_countries_today").DataTable({
      scrollCollapse: true,
      scrollX: true,
      order: [[1, "desc"]],
      paging: false
    });
  });
});
