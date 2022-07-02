package com.customevent;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Timer;
import java.util.TimerTask;

public class CustomNativeModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext context;
    private Timer timer;
    private String eventName = "myEventName";

    CustomNativeModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    @Override
    public String getName() {
        return "CustomNativeModule";
    }

    @ReactMethod
    public void startEvent(Integer interval, ReadableMap metaData) {
        WritableMap params = Arguments.createMap();
        params.merge(metaData);
        final Integer[] passedTime = { 0 };
        timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                passedTime[0] = passedTime[0] + interval;
                params.putInt("seconds", passedTime[0]);
                try {
                    context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName,
                            params.copy());
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        }, 0, interval);
    }

    @ReactMethod
    public void stopEvent() {
        if(timer != null) timer.cancel();
    }

}