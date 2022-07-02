//
//  CustomNativeModule.m
//  CustomEvent
//
//  Created by ibrahim.hassan on 7/2/22.
//

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(CustomNativeModule, RCTEventEmitter)

RCT_EXTERN_METHOD(startEvent:(NSInteger)interval metaData:(NSDictionary*)metaData )

RCT_EXTERN_METHOD(stopEvent)

@end

