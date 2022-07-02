//
//  CustomNativeModule.swift
//  CustomEvent
//
//  Created by ibrahim.hassan on 7/2/22.
//

import Foundation
import React


@objc(CustomNativeModule)
class CustomNativeModule: RCTEventEmitter{
  let eventName: String = "myEventName"
  var interval : Int = 0
  var metaData: NSMutableDictionary = [:]
  var timer = Timer()

  @objc
  func startEvent(_ interval:Int, metaData:NSDictionary) -> Void {
    self.timer.invalidate()
    self.metaData = NSMutableDictionary(dictionary: metaData)
    self.interval = interval
    DispatchQueue.main.async(execute: {
      self.timer = Timer.scheduledTimer(timeInterval: 1.0, target: self, selector:#selector(self.sendData), userInfo: metaData, repeats: true)
    })
  }
 
  @objc
  func stopEvent() -> Void{
    timer.invalidate()
  }

  override func supportedEvents() -> [String]! {
    return  [self.eventName]
  }
  
  @objc override static func requiresMainQueueSetup() -> Bool {
      return false
  }
  
  @objc func sendData ()-> Void{
    var seconds = (self.metaData["seconds"] as? NSInteger) ?? 0
    seconds = self.interval + seconds
    self.metaData["seconds"] = seconds
    self.sendEvent(withName: self.eventName, body: self.metaData)
  }
}
