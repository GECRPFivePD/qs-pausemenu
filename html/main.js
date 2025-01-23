const center_x = 117.3;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.0205;

let LangData = {};

$(document).ready(function () {
    $.post(`https://${GetParentResourceName()}/GetLangData`, JSON.stringify({}), function (lang) {
        LangData = lang.table[lang.current];
        LoadTranslations();
    });
});

function LoadTranslations() {
    document.getElementById("settings").innerHTML = LangData.PAUSEMENU_Settings;
    document.getElementById("resume").innerHTML = LangData.PAUSEMENU_Resume;
    document.getElementById("exit").innerHTML = LangData.PAUSEMENU_Exit;
}

const CUSTOM_CRS = L.extend({}, L.CRS.Simple, {
    projection: L.Projection.LonLat,
    scale: function(zoom) {
        return Math.pow(2, zoom);
    },
    zoom: function(sc) {
        return Math.log(sc) / 0.6931471805599453;
    },
    distance: function(pos1, pos2) {
        var x_difference = pos2.lng - pos1.lng;
        var y_difference = pos2.lat - pos1.lat;
        return Math.sqrt(x_difference * x_difference + y_difference * y_difference);
    },
    transformation: new L.Transformation(scale_x, center_x, -scale_y, center_y),
    infinite: true
});

const AtlasStyle = L.tileLayer('./mapStyles/styleAtlas/{z}/{x}/{y}.jpg',
{
  minZoom: 0,
  maxZoom: 5,
  noWrap: true,
  continuousWorld: false,
  attribution: 'Online map GTA V',
  id: 'styleAtlas map',
}
);

let mymap;
let ShowMenu = false;

window.addEventListener("message", function(event) {
    const data = event.data;

    switch (data.action) {
        case 'open':
            $(".ui-container").show();
            document.getElementById("logo").src = data.Logo;
            document.getElementById("location").innerHTML = '<strong>' + LangData.PAUSEMENU_Location + ':</strong> ' + data.streetName;
            const birthdate = data.UserData.Birthdate;
            const genderImage = data.gendertype;
        $(".character_info").html(`
            <span>${data.UserData.FirstName} ${data.UserData.LastName}</span>
            <img src="${genderImage}">
            <span id="text_blue">${birthdate}</span>
        `);

            $("#job").html(`
            <img src="./assets/i-job.svg">
            <span>${LangData.PAUSEMENU_Job}:</span>
            <span id="text_white">  ${data.UserData.Job}</span>
        `);
        
        $("#phone").html(`
            <img src="./assets/i-phone.svg">
            <span>${LangData.PAUSEMENU_Phone}:</span>
            <span id="text_white">  ${data.UserData.Phone}</span>
        `);
        
        $("#cash").html(`
            <img src="./assets/i-cash.svg">
            <span>${LangData.PAUSEMENU_Cash}:</span>
            <span id="text_white">${"$ "} ${data.UserData.Cash}</span>
        `);
        
        $("#bank").html(`
            <img src="./assets/i-bank.svg">
            <span>${LangData.PAUSEMENU_Bank}:</span>
            <span id="text_white">${"$ "} ${data.UserData.Bank}</span>
        `);
        
        $("#ping").html(`
            <img src="./assets/i-ping.svg">
            <span>${LangData.PAUSEMENU_Ping}:</span>
            <span id="text_white"> ${data.UserData.Ping} ${" "} ms</span>
        `);
        
        $("#totalplayer").html(`
            <img src="./assets/i-players.svg">
            <span>${LangData.PAUSEMENU_Players}:</span>
            <span id="text_white">  ${data.TotalPlayer}</span>
        `);
        
        $("#police").html(`
            <img src="./assets/i-police.svg">
            <span>${LangData.PAUSEMENU_Police}:</span>
            <span id="text_white">  ${data.UserData.Police}</span>
        `);

            initializeMap(data.x, data.y);

            square2Elements = document.querySelectorAll(".square2");
            square3Elements = document.querySelectorAll(".square3");
            info_playerelements = document.querySelectorAll(".info_player");
            info_serverelements = document.querySelectorAll(".info_server");
            squareElements = document.querySelectorAll(".square");
            logo = document.querySelector(".logo img");
            chr = document.querySelector(".character_img");

            square2Elements.forEach(element => {
                element.classList.remove("slide-right");
                void element.offsetWidth;
                element.classList.add("slide-right");
            });    
            
            squareElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.remove("square-slide-bottom");
                    void element.offsetWidth;
                    element.style.opacity = 1;
                    element.classList.add("square-slide-bottom");
                }, index * 50);
            });

            logo.classList.remove("logo-right");
            logo.classList.add("logo-right");


            chr.classList.remove("character_img-right");
            chr.classList.add("character_img-right");
            setTimeout(() => {
                document.getElementById("character_info").style.width = 12 + "vw";
                setTimeout(() => {
                    document.querySelector(".character_info span").style.opacity = 1;
                    document.getElementById("text_blue").style.opacity = 1;
                    document.querySelector(".character_info img").style.opacity = 1;
                    info_playerelements.forEach((element, index) => {
                        setTimeout(() => {
                            element.style.opacity = 1;
                        }, index * 50);
                    });
                    setTimeout(() => {
                        info_serverelements.forEach((element, index) => {
                            setTimeout(() => {
                                element.style.opacity = 1;
                            }, index * 50);
                        });
                        square3Elements.forEach((element, index) => {
                            element.classList.remove("slide-top");
                            void element.offsetWidth; 
                        
                            setTimeout(() => {
                                element.style.opacity = 1;
                                element.classList.add("slide-top");
                            }, index * 40);
                        });  
                        
                    }, 100);
                }, 50);
            }, 200);
            break;

        case 'close':
            const totalElements = info_playerelements.length;
            const totalElements2 = info_serverelements.length;
            const totalElements3 = squareElements.length;
            info_serverelements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = 0;
                }, (totalElements2 - index - 1) * 10);
            });
            setTimeout(() => {
                info_playerelements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = 0;
                    }, (totalElements - index - 1) * 10);
                });
                setTimeout(() => {
                    square2Elements.forEach((element) => {
                        element.classList.remove("slide-right");
                        element.classList.add("slide-left");
                    });

                    squareElements.forEach((element, index) => {
                        setTimeout(() => {
                            element.classList.remove("square-slide-bottom"); 
                            void element.offsetWidth;
                            element.style.opacity = 0;
                            element.classList.add("square-slide-top");
                        }, (totalElements - index - 1) * 20);
                    });
                
                    logo.classList.remove("logo-right");
                    logo.classList.add("logo-left");
                
                    square3Elements.forEach((el, idx) => {
                        el.classList.remove("slide-top");
                        void el.offsetWidth;
                        
                        setTimeout(() => {
                            el.style.opacity = 0;
                        }, idx * 10);
                    });
                
                    setTimeout(() => {
                        const characterInfoSpan = document.querySelector(".character_info span");
                        const textBlue = document.getElementById("text_blue");
                        const characterInfoImg = document.querySelector(".character_info img");
                        const characterInfo = document.getElementById("character_info");
                
                        characterInfoSpan.style.opacity = 0;
                        textBlue.style.opacity = 0;
                        characterInfoImg.style.opacity = 0;
                
                        setTimeout(() => {
                            characterInfo.style.width = "0vw";
                            
                            setTimeout(() => {
                                chr.classList.remove("character_img-right");
                                chr.classList.add("character_img-left");
                            }, 50);
                        }, 50);
                    }, 0);
                
                    setTimeout(() => {
                        $(".ui-container").hide();
                        
                        square2Elements.forEach((element) => {
                            element.classList.remove("slide-left");
                        });
                        squareElements.forEach(element => {
                            element.classList.remove("square-slide-top");
                        });
                        logo.classList.remove("logo-left");
                        chr.classList.remove("character_img-left");
                    }, 500);
                }, 200);
            }, 200);

            break;
            
        case 'set_mugshot':
            const mugshotUrl = data.mugshot;
            const infoCharacterElement = document.querySelector(".character_img");
            if (infoCharacterElement) {
                infoCharacterElement.innerHTML = '<img src="' + mugshotUrl + '" alt="Mugshot" style="position: absolute; left: 0.1vw; top: 0.2vw; height: 4.5vw; width: 4.5vw; border-radius: 10px;">';
            }
            break;
        case 'open_link':
            window.invokeNative("openUrl", data.link);
            break;
    }
});

function padZero(num) {
    return num < 10 ? '0' + num : num;
}

function updateTime() {
    const now = new Date();

    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const seconds = padZero(now.getSeconds());
    const timeString = `${hours}:${minutes}:${seconds}`;

    const day = padZero(now.getDate());
    const month = padZero(now.getMonth() + 1);
    const year = now.getFullYear();
    const dateString = `${day}·${month}·${year}`;

    $("#time").html(`
        <img src="./assets/i-time.svg" alt="Time Icon">
        <span>${LangData.PAUSEMENU_Time}:</span>
        <span id="text_white"> ${timeString}</span>
    `);

    $("#date").html(`
        <img src="./assets/i-date.svg" alt="Date Icon">
        <span>${LangData.PAUSEMENU_Date}:</span>
        <span id="text_white"> ${dateString}</span>
    `);
}

updateTime();

setInterval(updateTime, 1000);

function initializeMap(centerX, centerY) {
    if (!mymap) {
        mymap = L.map('map', {
            crs: CUSTOM_CRS,
            minZoom: 3.5,
            maxZoom: 3.5,
            zoom: 2,
            maxNativeZoom: 5,
            preferCanvas: true,
            layers: [AtlasStyle],
            center: [centerY, centerX],
            zoomControl: false,
            attributionControl: false,
            dragging: false, 
            scrollWheelZoom: false, 
            touchZoom: false,
            doubleClickZoom: false
        });

        AtlasStyle.addTo(mymap);

        const ExampleGroup = L.layerGroup().addTo(mymap);
        L.marker([centerY, centerX], {icon: customIcon(1)}).addTo(ExampleGroup);
        
    } else {
        mymap.setView([centerY, centerX], 3.5);
    }
}
    
const initialRotationOffset = 280;

function customIcon(icon, angle) {
    const adjustedAngle = (angle + initialRotationOffset);
    return L.divIcon({
        className: 'custom-icon',
        html: `<img src="./assets/i-map_point.svg" style="transform: rotate(${adjustedAngle}deg);">`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -15]
    });
}

document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('mouseover', () => {
        square.classList.add('show');
    });

    square.addEventListener('mouseout', () => {
        square.classList.remove('show');
    });
});

$(document).keydown(function(e) {
    if (e.keyCode == 27 ) {
        $.post(`https://${GetParentResourceName()}/close`, JSON.stringify({}));
        return;
    }
});

function action(on, links) {
    var audio = document.getElementById('SelectSound');
    audio.pause();
    audio.currentTime = 0;  
    audio.play();
    $.post(`https://${GetParentResourceName()}/click`, JSON.stringify({
        action: on,
        link: links
    }));
}

var squares = document.querySelectorAll('.square, .square2');
var audio = document.getElementById('HoverSound');

squares.forEach(function(square) {
    square.addEventListener('mouseenter', function() {
        audio.pause(); 
        audio.currentTime = 0;  
        audio.volume = 0.2;
        audio.play();           
    });
});
