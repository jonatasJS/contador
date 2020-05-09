$(document).ready( function(){
    var t=$(window).height()-50;
    $("#conteudo").css("min-height",t),
    $('[data-toggle="popover"]').popover(),
    $('[data-toggle="tooltip"]').tooltip(),-1!=navigator.userAgent.toLowerCase().search(/(android)/i)&&$("#modal-app").modal("show")
}),
$("#nome-canal").on("keypress",function(t){
    13==t.keyCode&&$("#buscar").click()
}),
$("#buscar").on("click",function(){
    $(this);
    var t=$("#nome-canal").val();
    ""==t?$("#nome-canal").css("border","1px solid red"):($("#nome-canal").css("border","1px solid #ecf0f1"),
    $("#div-loading").removeClass("d-none"),buscarInfoCanal(t))}),
    $("#btn-refresh").on("click",function(){
        location.reload()
    });
    var buscarInfoCanal=function(t){
        "undefined"!=typeof buscar&&clearInterval(buscar),
        $.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q="+t+"&type=channel&maxResults=1&key=AIzaSyAIOx9O0rI0dEZ3R1rsno1KLWE_vUfSbDM",function(t){
            if(t.pageInfo.totalResults<1)return alert("Canal não encontrado"),
            $("#buscar").html('<i class="fa fa-search" aria-hidden="true"></i>'),
            void $("#div-loading").addClass("d-none");
            var e=t.items[0].snippet.channelId,a=t.items[0].snippet.description,n=t.items[0].snippet.thumbnails.high.url;
            $("#logo").attr("src",n),
            $("#descricao").html(a),
            $("#direcionar-canal").attr("href","https://www.youtube.com/channel/"+e),iniciaGrafico(),arrumarLayout(),
            buscar=setInterval(
                function(){
                    buscarEstatisticas(e)
                },2e3)
            }
        )},
        buscarEstatisticas=function(t){
            $.get("https://www.googleapis.com/youtube/v3/channels?part=statistics,brandingSettings&id="+t+"&key=AIzaSyAIOx9O0rI0dEZ3R1rsno1KLWE_vUfSbDM",
            console.log(t),
            function(t){
                var e=parseInt(t.items[0].statistics.subscriberCount),a=t.items[0].statistics.videoCount,n=t.items[0].statistics.viewCount,o=t.items[0].brandingSettings.image.bannerImageUrl,i=t.items[0].brandingSettings.image.bannerMobileExtraHdImageUrl;
                $("#inscrito").html(e.toLocaleString("pt-BR")),
                $("#total-video").find("span").html(abbreviateNumber(a)),
                $("#total-view").find("span").html(abbreviateNumber(n)),
                $("#conteudo-capa-desktop").css("background-image",'url("'+o+'")'),
                $("#conteudo-capa-mobile").css("background-image",'url("'+i+'")'),
                $("#total-video").find("i").attr("data-content",a),
                $("#total-view").find("i").attr("data-content",n);
                var s=(new Date).getTime();series.addPoint([s,e],!0,!0),
                $("#div-loading").addClass("d-none")})},abbreviateNumber=function(t){
                    var e=t;
                    if(t>=1e3){
                        for(var a=Math.floor((""+t).length/3),n="",o=2; o>=1; o--){
                            if(((n=parseFloat((0!=a?t/Math.pow(1e3,a):t).toPrecision(o)))+"").replace(/[^a-zA-Z 0-9]+/g,"").length<=2)break}n%1!=0&&(shortNum=n.toFixed(1)),e=n+["","k","m","b","t"][a]}return e},
                            arrumarLayout=function(){
                                $("#conteudo-pesquisa").removeClass("d-none"),
                                $("#btn-refresh").removeClass("d-none"),
                                $("#conteudo-formulario").addClass("d-none")},
                                iniciaGrafico=function(){
                                    Highcharts.setOptions({
                                        global:{useUTC:!1}
                                    }),
                                    Highcharts.stockChart("container",{
                                        chart:{
                                            events:{
                                                load:function(){
                                                    series=this.series[0]
                                                }
                                            }
                                        },
                                        series:[
                                            {
                                                name:"Inscritos",
                                                data:function(){
                                                    var t,e=[],
                                                    a=(new Date).getTime();
                                                    for(t=-5;t<=0;t+=1)e.push([a,0]);
                                                    return e}()}],
                                                    rangeSelector:{
                                                        buttons:[
                                                            {
                                                                type:"all",
                                                                text:"All"
                                                            }
                                                        ],
                                                                inputEnabled:!1,selected:0
                                                            },
                                                                title:{
                                                                    text:"Inscritos em tempo real"
                                                                },
                                                                exporting:{
                                                                    enabled:!1
                                                                }
                                                            })
                                                        };