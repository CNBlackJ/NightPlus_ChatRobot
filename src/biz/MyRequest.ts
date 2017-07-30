module MyRequest {
    export class Verifier {
        acceptOrDeny(request: any): string {
            if (request) {
                if (request.hello != '') {
                    request.accept()
                    return request.hello
                } else {
                    return ''
                }
            } else {
                return ''
            }
        }
    }

    // TODO: as the project becoming more complicate, we need a parser to parse the requests
    export class requestParser {
        parse(request: string) {
        }
    }
}

export = MyRequest