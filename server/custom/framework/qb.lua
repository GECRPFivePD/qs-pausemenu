if Config.Framework ~= 'qb' then
    return
end

QBCore = exports['qb-core']:GetCoreObject()
Framework = QBCore

function GetPlayerFromId(source)
    return QBCore.Functions.GetPlayer(source)
end

function GetPlayerIdentifier(source)
    local player = GetPlayerFromId(source)
    if not player then return Wait(100) end
    return player.PlayerData.citizenid
end

local policeInfo = _U('PAUSEMENU_Unavailable')

CreateThread(function()
    while true do
        police_available = _U('PAUSEMENU_Unavailable')
        local players = QBCore.Functions.GetQBPlayers()
        if #players > 0 then
            for _, jobName in pairs(Config.PoliceJobs) do

                for _, player in pairs(players) do
                    if player.PlayerData.job.name == jobName and player.PlayerData.job.onduty then
                      
                        police_available = _U('PAUSEMENU_Available')

                    end
                end
            end
        end

        Wait(10000)
    end
end)

QBCore.Functions.CreateCallback('qs-pausemenu:GetData', function(source, cb)
    local Player = GetPlayerFromId(source)
    cb({
        info = {
            FirstName = Player.PlayerData.charinfo.firstname,
            LastName = Player.PlayerData.charinfo.lastname,
            Birthdate = Player.PlayerData.charinfo.birthdate,
            Job = Player.PlayerData.job.label,
            Grade = Player.PlayerData.job.grade.name,
            Gender = Player.PlayerData.charinfo.gender,
            Cash = Player.PlayerData.money['cash'],
            Bank = Player.PlayerData.money['bank'],
            Ping = GetPlayerPing(source),
            Police = police_available,
            Phone =  safeGetNumberPhone(source),
        },

        players = getServerStatus(),
    })
end)

function safeGetNumberPhone(source)
    local success, result = pcall(function()
        if GetResourceState('qs-smartphone') == 'started' then
            return exports['qs-base']:GetPlayerPhone(source)
        elseif GetResourceState('qs-smartphone-pro') == 'started' then
            local identifier = GetPlayerIdentifier(source)
            local mustBePhoneOwner = true
            local number = exports['qs-smartphone-pro']:GetPhoneNumberFromIdentifier(identifier, mustBePhoneOwner)
            return number
        end
    end)

    if success then
        return result
    else
        print("Error occurred while getting phone number: " .. result)
        return "412-323" 
    end
end