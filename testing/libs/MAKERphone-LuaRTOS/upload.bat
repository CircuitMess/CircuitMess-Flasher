pip install esptool
set port=%1
esptool --chip esp32 --baud 115200 --port %port% --before default_reset --after hard_reset write_flash -z --flash_mode dio --flash_freq 40m --flash_size detect 0x1000 ./bootloader.GENERIC.bin 0x90000 ./lua_rtos.bin 0x8000 ./partitions.bin
pause