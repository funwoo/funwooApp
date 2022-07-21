package com.funwoo.org.NativeModule;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

import javax.annotation.Nullable;

public class StreetViewManager extends SimpleViewManager<StreetView> {
    public static final String REACT_CLASS = "StreetView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected StreetView createViewInstance(ThemedReactContext themedReactContext) {
        return new StreetView(themedReactContext);
    }

    @ReactProp(name = "allGesturesEnabled", defaultBoolean = false)
    public void setAllGesturesEnabled(StreetView view, boolean allGesturesEnabled) {
        view.setAllGesturesEnabled(allGesturesEnabled);
    }

    @ReactProp(name = "coordinate")
    public void setCoordinate(StreetView view, ReadableMap coordinate) {
        view.setCoordinate(coordinate);
    }
    @ReactProp(name = "pov")
    public void setPov(StreetView view, ReadableMap pov) {
        view.setPov(pov);
    }

    @Override
    public @Nullable
    Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                StreetViewEvent.eventNameForType(StreetViewEvent.ON_ERROR), MapBuilder.of("registrationName", StreetViewEvent.eventNameForType(StreetViewEvent.ON_ERROR)),
                StreetViewEvent.eventNameForType(StreetViewEvent.ON_SUCCESS), MapBuilder.of("registrationName", StreetViewEvent.eventNameForType(StreetViewEvent.ON_SUCCESS))
        );
    }
}
