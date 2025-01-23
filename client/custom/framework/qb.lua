if Config.Framework ~= 'qb' then
    return
end

QBCore = exports['qb-core']:GetCoreObject()
Framework = QBCore

function GetUserData()
    local p = promise.new()
    QBCore.Functions.TriggerCallback('qs-pausemenu:GetData', function(cb) p:resolve(cb) end)
    local Data = Citizen.Await(p)
    local info = {Data.info, Data.players}
    return info
end


closemenu = function()
    if open then 
        SendNUIMessage({action = 'close'})
        SetNuiFocus(false, false)
        Wait(500)
        open = false
    end
end