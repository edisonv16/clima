$(document).ready(function(){$.get("http://api.openweathermap.org/data/2.5/forecast?id=5095808&appid=5034801f02b7a43482db1c080227f31b",function(t,e){var a,r,n,p,s,i,o,d,l,c,u,x;"success"==e&&(console.log(t),a=t.list[7].main.temp-273.15,r=t.list[8].main.temp-273.15,n=t.list[16].main.temp-273.15,console.log(Math.round(a)+"°C"),p=Math.round(a)+"°C",s=t.list[0].dt_txt,i=t.list[0].weather[0].description,$(".rain .temperatura p").text(p),$(".rain p strong").text(s),$(".rain p span").text(i),o=Math.round(r)+"°C",d=t.list[8].dt_txt,l=t.list[8].weather[0].description,$(".clear p strong").text(d),$(".clear p span").text(l),$(".clear .temperatura p").text(o),c=Math.round(n)+"°C",u=t.list[16].dt_txt,x=t.list[16].weather[0].description,$(".clouds .temperatura p").text(c),$(".clouds p strong").text(u),$(".clouds p span").text(x))})});