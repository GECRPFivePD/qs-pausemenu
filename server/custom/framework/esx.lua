if Config.Framework ~= 'esx' then
    return
end

ESX = exports['es_extended']:getSharedObject()
Framework = ESX

function GetPlayerFromId(source)
    return ESX.GetPlayerFromId(source)
end

function GetPlayerIdentifier(source)
    local player = GetPlayerFromId(source)
    if not player then return Wait(100) end
    return player.identifier
end

local policeInfo = _U('PAUSEMENU_Unavailable')

CreateThread(function()
    while true do
        police_available = _U('PAUSEMENU_Unavailable')
        local players = ESX.GetExtendedPlayers()
        if #players > 0 then
            for _, jobName in pairs(Config.PoliceJobs) do

                for _, player in pairs(players) do
                    if player.job.name == jobName then
                      
                        police_available = _U('PAUSEMENU_Available')

                    end
                end
            end
        end

        Wait(10000)
    end
end)

ESX.RegisterServerCallback('qs-pausemenu:GetData', function(source, cb)
    local xPlayer = GetPlayerFromId(source)

    cb({
        info = {
            FirstName = xPlayer.get('firstName'),
            LastName = xPlayer.get('lastName'),
            Birthdate = xPlayer.get('dateofbirth'),
            Job = xPlayer.job.label,
            Grade = xPlayer.job.grade_label,
            Gender = xPlayer.get('sex'),
            Cash = xPlayer.getAccount('money').money,
            Bank = xPlayer.getAccount('bank').money,
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