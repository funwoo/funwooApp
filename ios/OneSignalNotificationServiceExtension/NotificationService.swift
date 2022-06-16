import UserNotifications
import UIKit
import OneSignal
import Intents
import SDWebImage
class NotificationService: UNNotificationServiceExtension {
  
  var contentHandler: ((UNNotificationContent) -> Void)?
  var receivedRequest: UNNotificationRequest!
  var bestAttemptContent: UNMutableNotificationContent?
  
  @available(iOSApplicationExtension 15.0, *)
  func handleContent(subtitle:String,title:String,body:String,targetContentIdentifier:String,imageData:Data){
    let avatar =  INImage(imageData:imageData)
    var personNameComponents = PersonNameComponents()
    personNameComponents.nickname = subtitle
    var content = UNMutableNotificationContent()
    
    content.threadIdentifier = targetContentIdentifier
    content.categoryIdentifier = subtitle
    content.sound = .default
    let senderPerson = INPerson(
      personHandle: INPersonHandle(value: nil, type: .unknown),
      nameComponents: personNameComponents,
      displayName:title,
      image: avatar,
      contactIdentifier: nil,
      customIdentifier: nil,
      isMe: false,
      suggestionType: .none
    )
    let mePerson = INPerson(
      personHandle: INPersonHandle(value: nil, type: .unknown),
      nameComponents: nil,
      displayName: nil,
      image: avatar,
      contactIdentifier: nil,
      customIdentifier: nil,
      isMe: true,
      suggestionType: .none
    )
    let intent = INSendMessageIntent(
      recipients: [mePerson,senderPerson],
      outgoingMessageType: .outgoingMessageText,
      content: body,
      speakableGroupName: INSpeakableString(spokenPhrase: subtitle),
      conversationIdentifier:targetContentIdentifier,
      serviceName: subtitle,
      sender: senderPerson,
      attachments: nil
    )
    intent.setImage(avatar, forParameterNamed: \.speakableGroupName)
    let interaction = INInteraction(intent: intent, response: nil)
    interaction.direction = .incoming
    interaction.donate(completion: nil)
    do {
      content = try content.updating(from: intent) as! UNMutableNotificationContent
      content.title = title
      content.subtitle = subtitle
      content.body = body
      self.contentHandler!(content)
    } catch {
      // Handle error
    }
  }
  override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
    self.contentHandler = contentHandler
    print("received")
    if #available(iOSApplicationExtension 15.0, *) {
      if(request.content.targetContentIdentifier != nil){
        var targetContentIdentifier = request.content.targetContentIdentifier!
        
        do {
          let defaults = UserDefaults(suiteName: "group.com.funwoo.funwoochat.onesignal")
          defaults?.string(forKey: request.content.targetContentIdentifier!)
          targetContentIdentifier =  targetContentIdentifier.replacingOccurrences(of: "line:", with: "")
          targetContentIdentifier = targetContentIdentifier.replacingOccurrences(of: "facebook:", with: "")
          let value = defaults!.string(forKey: targetContentIdentifier)
          
          let user = try UserModel(value!)
          if(user.avatar != nil && user.avatar != ""){
            print(user)
            SDWebImageManager.shared.loadImage(
              with:URL(string: user.avatar!),
              options: .continueInBackground, // or .highPriority
              progress: nil,
              completed: { [weak self] (image, data, error, cacheType, finished, url) in
                guard let self = self else { return }
                
                if let err = error {
                  // Do something with the error
                  return
                }
                
                guard let img = image else {
                  // No image handle this error
                  return
                }
                
                self.handleContent(subtitle: request.content.subtitle , title: request.content.title , body: request.content.body , targetContentIdentifier: request.content.targetContentIdentifier ?? "", imageData: img.sd_imageData()!)
                
                // Do something with image
              }
            )
          }else{
            let image = UIImage(named: "Avatar")
            
            self.handleContent(subtitle: request.content.subtitle, title: request.content.title, body: request.content.body, targetContentIdentifier: request.content.targetContentIdentifier ?? "", imageData: (image?.jpegData(compressionQuality: 1))!)
          }
        }
        catch {
          if let bestAttemptContent = bestAttemptContent {
            //If your SDK version is < 3.5.0 uncomment and use this code:
            /*
             OneSignal.didReceiveNotificationExtensionRequest(self.receivedRequest, with: self.bestAttemptContent)
             contentHandler(bestAttemptContent)
             */
            
            /* DEBUGGING: Uncomment the 2 lines below to check this extension is excuting
             Note, this extension only runs when mutable-content is set
             Setting an attachment or action buttons automatically adds this */
            //OneSignal.setLogLevel(.LL_VERBOSE, visualLevel: .LL_NONE)
            //bestAttemptContent.body = "[Modified] " + bestAttemptContent.body
            
            OneSignal.didReceiveNotificationExtensionRequest(self.receivedRequest, with: bestAttemptContent, withContentHandler: self.contentHandler)
            
          }
        }
        
      }
    }
    
    if let bestAttemptContent = bestAttemptContent {
      //If your SDK version is < 3.5.0 uncomment and use this code:
      /*
       OneSignal.didReceiveNotificationExtensionRequest(self.receivedRequest, with: self.bestAttemptContent)
       contentHandler(bestAttemptContent)
       */
      
      /* DEBUGGING: Uncomment the 2 lines below to check this extension is excuting
       Note, this extension only runs when mutable-content is set
       Setting an attachment or action buttons automatically adds this */
      //OneSignal.setLogLevel(.LL_VERBOSE, visualLevel: .LL_NONE)
      //bestAttemptContent.body = "[Modified] " + bestAttemptContent.body
      
      OneSignal.didReceiveNotificationExtensionRequest(self.receivedRequest, with: bestAttemptContent, withContentHandler: self.contentHandler)
      
    }
    
    
  }
  
  override func serviceExtensionTimeWillExpire() {
    // Called just before the extension will be terminated by the system.
    // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
    if let contentHandler = contentHandler, let bestAttemptContent =  bestAttemptContent {
      OneSignal.serviceExtensionTimeWillExpireRequest(self.receivedRequest, with: self.bestAttemptContent)
      contentHandler(bestAttemptContent)
    }
  }
  
}

extension String {
  func base64Encoded() -> String? {
    return data(using: .utf8)?.base64EncodedString()
  }
  
  func base64Decoded() -> String? {
    guard let data = Data(base64Encoded: self) else { return nil }
    return String(data: data, encoding: .utf8)
  }
}
