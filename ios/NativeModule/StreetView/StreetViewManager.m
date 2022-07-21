#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>
#import <React/RCTConvert+CoreLocation.h>
#import "StreetView.h"
@import GoogleMaps;

@interface StreetViewManager : RCTViewManager
@end

@implementation StreetViewManager

RCT_EXPORT_MODULE()

RCT_CUSTOM_VIEW_PROPERTY(coordinate, CLLocationCoordinate, StreetView) {
  if (json == nil) return;

  NSInteger radius = [[json valueForKey:@"radius"] intValue];
  if(radius == 0){
    radius = 50;
  }

  [view moveNearCoordinate:[RCTConvert CLLocationCoordinate2D:json]
                    radius: radius];
}
RCT_CUSTOM_VIEW_PROPERTY(marker, CLLocationCoordinate, StreetView){
  CLLocationCoordinate2D position =  [RCTConvert CLLocationCoordinate2D:json];
  GMSMarker *marker = [GMSMarker markerWithPosition:position];
  marker.panoramaView = view;
}
RCT_CUSTOM_VIEW_PROPERTY(heading, CLLocationDegrees, StreetView) {
  if (json == nil) return;
  view.camera = [GMSPanoramaCamera cameraWithHeading:[RCTConvert CLLocationDegrees:json] pitch:0 zoom:1];
}

RCT_EXPORT_VIEW_PROPERTY(allGesturesEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onError, RCTDirectEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onSuccess, RCTDirectEventBlock);

- (UIView *)view {
  StreetView *panoView = [[StreetView alloc] initWithFrame:CGRectZero];
  panoView.delegate = panoView;
  return panoView;
}

@end
