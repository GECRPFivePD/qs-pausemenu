if Config.Framework ~= 'esx' then
    return
end

ESX = exports['es_extended']:getSharedObject()
Framework = ESX

function GetUserData()
    local p = promise.new()
    ESX.TriggerServerCallback('qs-pausemenu:GetData', function(cb) p:resolve(cb) end)
    local Data = Citizen.Await(p)
    return {Data.info, Data.players}
end

closemenu = function()
    if open then 
        SendNUIMessage({action = 'close'})
        SetNuiFocus(false, false)
        Wait(500)
        open = false
    end
end