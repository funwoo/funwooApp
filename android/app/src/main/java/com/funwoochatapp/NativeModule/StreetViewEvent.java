package com.funwoo.org.NativeModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.uimanager.events.Event;

public class StreetViewEvent extends Event<StreetViewEvent> {
    public static final int ON_ERROR = 1;
    public static final int ON_SUCCESS = 2;

    private final int mEventType;
    private WritableMap mMap;

    public StreetViewEvent(int viewId, int eventType) {
        super(viewId);
        mEventType = eventType;
        mMap = null;
    }

    public StreetViewEvent(int viewId, int eventType, WritableMap params) {
        super(viewId);
        mEventType = eventType;
        mMap = params;
    }

    public static String eventNameForType(int eventType) {
        switch (eventType) {
            case ON_ERROR:
                return "onError";
            case ON_SUCCESS:
                return "onSuccess";
            default:
                throw new IllegalStateException("Invalid image event: " + Integer.toString(eventType));
        }
    }

    public String getEventName() {
        return StreetViewEvent.eventNameForType(mEventType);
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), mMap);
    }
}
