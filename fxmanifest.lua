fx_version 'cerulean'

game 'gta5'

version "1.0.1"

lua54 'yes'

ui_page 'html/index.html'

shared_scripts {
	'config.lua',
	'utils/*.lua',
	'locales/*.lua'
}

client_scripts {
	'client/custom/**/**.lua',
	'client/*.lua'
}

server_scripts {
	'server/custom/**/**.lua',
	'server/*.lua'
}

files {
	'html/index.html',
	'html/global.css',
	'html/style.css',
	'html/main.js',
	'html/mapStyles/**/**/*.jpg',
	'html/assets/*.*'
}

escrow_ignore {
	'config.lua',
	'locales/*.lua',
	'client/custom/**/**.lua',
	'server/custom/**/**.lua',
}


dependency '/assetpacks'