--[[ 

    Welcome to the qs-pausemenu configuration!
    To start configuring your new asset, please read carefully
    each step in the documentation that we will attach at the end of this message.

    Each important part of the configuration will be highlighted with a box.
    like this one you are reading now, where I will explain step by step each
    configuration available within this file.

    This is not all, most of the settings, you are free to modify it
    as you wish and adapt it to your framework in the most comfortable way possible.
    The configurable files you will find all inside client/custom/*
    or inside server/custom/*.

    Direct link to the resource documentation, read it before you start:
    https://docs.quasar-store.com/information/welcome
]]

Config = Config or {}
Locales = Locales or {}

--[[

    ██╗░░░░░░█████╗░███╗░░██╗░██████╗░██╗░░░██╗░█████╗░░██████╗░███████╗
    ██║░░░░░██╔══██╗████╗░██║██╔════╝░██║░░░██║██╔══██╗██╔════╝░██╔════╝
    ██║░░░░░███████║██╔██╗██║██║░░██╗░██║░░░██║███████║██║░░██╗░█████╗░░
    ██║░░░░░██╔══██║██║╚████║██║░░╚██╗██║░░░██║██╔══██║██║░░╚██╗██╔══╝░░
    ███████╗██║░░██║██║░╚███║╚██████╔╝╚██████╔╝██║░░██║╚██████╔╝███████╗
    ╚══════╝╚═╝░░╚═╝╚═╝░░╚══╝░╚═════╝░░╚═════╝░╚═╝░░╚═╝░╚═════╝░╚══════╝

    The first thing will be to choose our main language, here you can choose
    between the default languages that you will find within locales/*,
    if yours is not there, feel free to create it!

	Languages available by default:
        'ar'
        'bg'
        'ca'
        'da'
        'de'
    	'en'
    	'es'
        'fa'
        'fr'
        'he'
        'hi'
        'it'
        'jp'
        'ko'
        'pt'
        'ru'
        'tr'
        'zh'
]]

Config.Language = 'en' -- 'en' or 'es' by default (you can create more)

--[[

    ███████╗██████╗░░█████╗░███╗░░░███╗███████╗░██╗░░░░░░░██╗░█████╗░██████╗░██╗░░██╗
    ██╔════╝██╔══██╗██╔══██╗████╗░████║██╔════╝░██║░░██╗░░██║██╔══██╗██╔══██╗██║░██╔╝
    █████╗░░██████╔╝███████║██╔████╔██║█████╗░░░╚██╗████╗██╔╝██║░░██║██████╔╝█████═╝░
    ██╔══╝░░██╔══██╗██╔══██║██║╚██╔╝██║██╔══╝░░░░████╔═████║░██║░░██║██╔══██╗██╔═██╗░
    ██║░░░░░██║░░██║██║░░██║██║░╚═╝░██║███████╗░░╚██╔╝░╚██╔╝░╚█████╔╝██║░░██║██║░╚██╗
    ╚═╝░░░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░░░░╚═╝╚══════╝░░░╚═╝░░░╚═╝░░░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝

    Framework configuration and tools of your server!
    Please read the usable options carefully, in case they
    are not here you can add more or modify the default ones
    in the client/custom/* and server/custom/* directories.

    Please choose from the following options:

    Framework:
        'esx'
        'qb'

]]

local esxHas = GetResourceState('es_extended') == 'started'
local qbHas = GetResourceState('qb-core') == 'started'

Config.Framework = esxHas and 'esx' or qbHas and 'qb' or 'esx' -- You can change to 'qb' or 'esx'

Config.PoliceJobs = {"miner", "police"}

Config.Logo = "https://cdn.discordapp.com/attachments/1322726709258092575/1331883282010345514/GEC_2.png?ex=67933c77&is=6791eaf7&hm=8133123022a71aa4ad7b4622b805f7ae89a93e59bc69ee5bd038570ec3043a23&"

Config.Links = {
    Discord = "https://discord.gg/f8yJADPmvV",
    Rules = "https://discord.gg/jc4gYZ2Bav",
    Store = "",
    Facebook = "",
    Instagram = "",
    TikTok = "h",
    X = "",
    YouTube = "",
}

Config.OpenInv = function()
    ExecuteCommand("inventory")  -- add the export or command here to open the inventory
end
