
import Foundation

// MARK: - Welcome
struct UserModel: Codable {
    let id, name, username: String?
    let avatar: String?
    let date: String?
    
    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name, username, avatar, date
    }
}

// MARK: Welcome convenience initializers and mutators

extension UserModel {
    init(data: Data) throws {
        self = try newJSONDecoder().decode(UserModel.self, from: data)
    }
    
    init(_ json: String, using encoding: String.Encoding = .utf8) throws {
        guard let data = json.data(using: encoding) else {
            throw NSError(domain: "JSONDecoding", code: 0, userInfo: nil)
        }
        try self.init(data: data)
    }
    
    init(fromURL url: URL) throws {
        try self.init(data: try Data(contentsOf: url))
    }
    
    func with(
        id: String? = nil,
        name: String? = nil,
        username: String? = nil,
        avatar: String? = nil,
        date: String? = nil
    ) -> UserModel {
        return UserModel(
            id: id ?? self.id,
            name: name ?? self.name,
            username: username ?? self.username,
            avatar: avatar ?? self.avatar,
            date: date ?? self.date
        )
    }
    
    func jsonData() throws -> Data {
        return try newJSONEncoder().encode(self)
    }
    
    func jsonString(encoding: String.Encoding = .utf8) throws -> String? {
        return String(data: try self.jsonData(), encoding: encoding)
    }
}

// MARK: - Helper functions for creating encoders and decoders

func newJSONDecoder() -> JSONDecoder {
    let decoder = JSONDecoder()
    if #available(iOS 10.0, OSX 10.12, tvOS 10.0, watchOS 3.0, *) {
        decoder.dateDecodingStrategy = .iso8601
    }
    return decoder
}

func newJSONEncoder() -> JSONEncoder {
    let encoder = JSONEncoder()
    if #available(iOS 10.0, OSX 10.12, tvOS 10.0, watchOS 3.0, *) {
        encoder.dateEncodingStrategy = .iso8601
    }
    return encoder
}
