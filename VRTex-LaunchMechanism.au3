; Autoit Script --> Autoit Demoware


HotKeySet("+{ESC}", "_Exit");
HotKeySet("+{HOME}", "_start");
WinActivate("Firefox", "");
WinActivate("flyingKinect Game Preview");

Func _Exit()
WinSetState("flyingKinect Game Preview", "", @SW_RESTORE);
EndFunc
;Kill the toplevel tab.

Func _start()
ControlSend("Firefox", "", 0, "^w");
;Show Crash.html
WinSetState("flyingKinect Game Preview", "", @SW_HIDE);
;sleep(0.02);
;WinActivate("flyingKinect Game Preview")

WinSetOnTop("Firefox", "", 1)
;Crash.html self-closes, shows UI.
;Which has always been receiving information.
EndFunc

While True
   Sleep(1);
WEnd
