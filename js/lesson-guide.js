/* Learning prompts supplement the source without changing quiz or SRS item IDs. */
(function (root) {
  'use strict';

  root.IELTSLessonGuide = {
    c1: {
      goal: 'Nhận diện chủ ngữ, động từ và bổ ngữ; viết được một câu hoàn chỉnh.',
      practice: 'Viết 5 câu về việc học của bạn. Gạch chân chủ ngữ và động từ; dùng ít nhất 2 câu có động từ nối.',
      checks: ['Mỗi câu có chủ ngữ, động từ và diễn đạt một ý trọn vẹn.', 'Phân biệt được tính từ sau động từ nối với trạng từ bổ nghĩa cho hành động.']
    },
    c2: {
      goal: 'Phân biệt danh từ đếm được và không đếm được; chọn mạo từ theo ngữ cảnh.',
      practice: 'Viết một đoạn 5 câu giới thiệu phòng học, dùng danh từ số ít, số nhiều và không đếm được. Giải thích lựa chọn a/an/the hoặc không có mạo từ.',
      checks: ['Danh từ đếm được số ít có từ hạn định phù hợp.', 'Không thêm -s hoặc a/an vào danh từ không đếm được trong cách dùng đang xét.']
    },
    c3: {
      goal: 'Chọn thì dựa trên mốc thời gian, diễn tiến và quan hệ trước–sau của sự việc.',
      practice: 'Viết 6 câu về thói quen, trải nghiệm, một sự việc đã kết thúc và kế hoạch sắp tới. Ghi lý do chọn thì bên cạnh mỗi câu.',
      checks: ['Nêu được mốc thời gian và lý do chọn thì, thay vì chỉ dựa vào từ khóa.', 'Kiểm tra trợ động từ và dạng động từ ở câu khẳng định, phủ định, nghi vấn.']
    },
    c4: {
      goal: 'Tìm đúng chủ ngữ chính để chia động từ, kể cả khi có cụm từ chen giữa.',
      practice: 'Viết 5 câu mô tả lớp học, có một câu dùng cụm of và một câu dùng each hoặc every. Khoanh chủ ngữ quyết định dạng động từ.',
      checks: ['Động từ hòa hợp với chủ ngữ chính, không bị kéo theo danh từ gần nhất.', 'Xử lý được các mẫu đặc biệt trong bài như each/every và there is/are.']
    },
    c5: {
      goal: 'Chọn loại câu điều kiện theo khả năng và thời điểm của giả thiết, kết quả.',
      practice: 'Viết 4 câu điều kiện: một sự thật chung, một khả năng tương lai, một giả thiết hiện tại và một điều tiếc nuối trong quá khứ.',
      checks: ['Giải thích được giả thiết thuộc hiện tại, tương lai hay quá khứ.', 'Dạng động từ trong hai mệnh đề phù hợp với ý nghĩa muốn diễn đạt.']
    },
    c6: {
      goal: 'Chuyển chủ động sang bị động và chọn bị động khi cần tập trung vào đối tượng chịu tác động.',
      practice: 'Viết 3 câu chủ động về một quy trình quen thuộc, rồi chuyển sang bị động và cân nhắc có cần nêu tác nhân hay không.',
      checks: ['Giữ nguyên thì và ý nghĩa khi chuyển câu; dùng đúng be và V3.', 'Đối tượng chịu tác động trở thành chủ ngữ; chỉ giữ by khi tác nhân có ích cho thông tin.']
    },
    c7: {
      goal: 'Bổ nghĩa cho danh từ bằng mệnh đề quan hệ; phân biệt thông tin xác định và bổ sung.',
      practice: 'Viết 4 câu giới thiệu một người và một địa điểm, gồm cả mệnh đề xác định lẫn không xác định.',
      checks: ['Đại từ quan hệ phù hợp với người, vật và vai trò trong mệnh đề.', 'Dấu phẩy phản ánh đúng loại thông tin; không dùng that cho mệnh đề không xác định.']
    },
    c8: {
      goal: 'Dùng modal verbs đúng sắc thái: khả năng, lời khuyên, nghĩa vụ và suy đoán.',
      practice: 'Viết 5 câu về việc đi học: một lời khuyên, một quy định, một điều không cần làm và hai suy đoán có mức chắc chắn khác nhau.',
      checks: ['Modal đi với dạng động từ thích hợp, không tự thêm -s hoặc to.', 'Phân biệt cấm đoán với không bắt buộc; mức độ chắc chắn đúng với ý định nói.']
    },
    c9: {
      goal: 'Nối các ý theo đúng quan hệ logic và phân biệt liên từ với trạng từ liên kết.',
      practice: 'Viết một đoạn 5 câu về học trực tuyến, có quan hệ nguyên nhân, tương phản và kết quả. Thử diễn đạt một ý bằng hai cách nối khác nhau.',
      checks: ['Mỗi từ nối thể hiện đúng quan hệ giữa hai ý.', 'Các mệnh đề độc lập được nối và ngắt câu đúng, tránh comma splice.']
    },
    c10: {
      goal: 'Chọn giới từ thời gian, nơi chốn và ghi nhớ giới từ theo cụm từ.',
      practice: 'Viết lịch học một tuần bằng 6 câu, gồm thời điểm, địa điểm và 3 cụm động từ hoặc tính từ đi kèm giới từ.',
      checks: ['Phân biệt được cách dùng in/on/at theo thời gian và địa điểm.', 'Kiểm tra giới từ theo cả cụm từ, thay vì dịch từng từ từ tiếng Việt.']
    },
    c11: {
      goal: 'Thuật lại lời nói và câu hỏi với đại từ, thì và mốc thời gian phù hợp.',
      practice: 'Tự viết một hội thoại ngắn 4 lượt, gồm một câu hỏi. Thuật lại cuộc trò chuyện vào ngày hôm sau.',
      checks: ['Đại từ và từ chỉ thời gian/nơi chốn phù hợp với người kể, thời điểm kể.', 'Câu hỏi gián tiếp có trật tự câu trần thuật; quyết định lùi thì theo ngữ cảnh.']
    },
    c12: {
      goal: 'Chọn V-ing, to V hoặc động từ nguyên mẫu theo cấu trúc và ý nghĩa.',
      practice: 'Viết 6 câu về thói quen và dự định, dùng các động từ thuộc ba nhóm trong bài. Có một cặp câu mà thay V-ing bằng to V làm đổi nghĩa.',
      checks: ['Tra và xác nhận cấu trúc đi sau động từ, kể cả khi có tân ngữ.', 'Giải thích được nghĩa của cặp câu thay đổi giữa V-ing và to V.']
    },
    c13: {
      goal: 'Dùng mệnh đề danh từ làm chủ ngữ, tân ngữ hoặc bổ ngữ trong câu.',
      practice: 'Viết 4 câu nêu điều bạn biết, điều chưa chắc chắn và một nhận định về giáo dục, dùng that, whether/if và một từ hỏi.',
      checks: ['Xác định được mệnh đề danh từ đang đảm nhiệm vai trò gì.', 'Giữ trật tự chủ ngữ–động từ trong mệnh đề, không đảo như câu hỏi trực tiếp.']
    },
    c14: {
      goal: 'Dùng đảo ngữ đúng cấu trúc khi nhấn mạnh hoặc diễn đạt điều kiện trang trọng.',
      practice: 'Viết 3 câu thông thường rồi viết lại bằng đảo ngữ: hai câu có ý phủ định/hạn định và một câu điều kiện.',
      checks: ['Chọn đúng trợ động từ, thì và vị trí chủ ngữ khi đảo.', 'Câu viết lại giữ nguyên ý nghĩa và phù hợp mức độ trang trọng của ngữ cảnh.']
    },
    c15: {
      goal: 'Chọn cấu trúc câu chẻ để làm nổi bật đúng thành phần thông tin.',
      practice: 'Viết một câu kể về thành tựu học tập. Viết lại thành hai câu chẻ để lần lượt nhấn mạnh người thực hiện và điều quan trọng với bạn.',
      checks: ['Chỉ ra được phần thông tin đang được nhấn mạnh trong mỗi câu.', 'Các thành phần của câu chẻ đầy đủ và giữ đúng ý của câu ban đầu.']
    },
    c16: {
      goal: 'Rút gọn mệnh đề bằng phân từ mà vẫn giữ đúng chủ thể và quan hệ nghĩa.',
      practice: 'Viết 4 câu có mệnh đề quan hệ hoặc trạng ngữ, rồi rút gọn những câu đủ điều kiện. Đánh dấu chủ thể của từng hành động.',
      checks: ['Chủ thể ngầm của cụm phân từ rõ ràng, tránh dangling participle.', 'V-ing, V3 hoặc having + V3 phản ánh đúng chủ động/bị động và thứ tự thời gian.']
    },
    c17: {
      goal: 'Chọn tính từ/trạng từ, sắp xếp tính từ và tạo cấu trúc so sánh rõ nghĩa.',
      practice: 'So sánh hai địa điểm học tập bằng 5 câu. Dùng một cụm có nhiều tính từ, một trạng từ và hai dạng so sánh khác nhau.',
      checks: ['Mỗi tính từ/trạng từ bổ nghĩa đúng thành phần; kiểm tra cả dạng bất quy tắc.', 'Cấu trúc so sánh và đối tượng đem so có quan hệ tương ứng, rõ ràng.']
    },
    c18: {
      goal: 'Dùng mạo từ và lượng từ theo nghĩa khái quát/cụ thể và tính đếm được của danh từ.',
      practice: 'Viết một đoạn 5 câu về tài nguyên học tập, dùng ít nhất 3 lượng từ. Giải thích hai lựa chọn có hoặc không dùng the.',
      checks: ['Giải thích được danh từ đang nói chung hay chỉ một đối tượng đã xác định.', 'Lượng từ phù hợp với danh từ đếm được/không đếm được và ý nghĩa muốn nói.']
    },
    c19: {
      goal: 'Dùng dấu phẩy, chấm phẩy và hai chấm để biểu đạt cấu trúc câu rõ ràng.',
      practice: 'Viết một đoạn 5 câu có phần liệt kê, thông tin bổ sung và hai mệnh đề độc lập. Rà lại từng dấu câu và giải thích công dụng.',
      checks: ['Không dùng dấu phẩy đơn lẻ để nối hai mệnh đề độc lập.', 'Dấu hai chấm và chấm phẩy được đặt sau phần câu có cấu trúc phù hợp.']
    },
    c20: {
      goal: 'Nhận ra các lỗi thường gặp do dịch từ tiếng Việt và tự sửa có lý do.',
      practice: 'Chọn một đoạn tiếng Anh bạn từng viết, tìm ít nhất 5 điểm cần rà về thành phần câu, dạng từ, giới từ và đuôi -s/-ed.',
      checks: ['Ghi lại cả bản gốc, bản sửa và quy tắc giải thích cho mỗi lỗi.', 'Đọc lại toàn câu sau khi sửa để kiểm tra ý nghĩa và sự hòa hợp.']
    },
    c21: {
      goal: 'Gắn việc học ngữ pháp với nhiệm vụ cụ thể trong bốn kỹ năng IELTS.',
      practice: 'Chọn một chủ điểm đã học. Viết 3 câu, nói một đoạn ngắn và tìm cấu trúc đó trong một bài đọc hoặc bản chép lời bài nghe.',
      checks: ['Giải thích được cấu trúc giúp diễn đạt hoặc hiểu ý gì trong từng nhiệm vụ.', 'Rà độ chính xác của câu tự tạo trước khi tăng độ phức tạp.']
    },
    c22: {
      goal: 'Phân biệt giả định mang nghĩa đề nghị/yêu cầu với câu thuật lại một nhận định.',
      practice: 'Viết 4 câu: hai đề nghị hoặc yêu cầu, một nhận định về sự thật và một giả thiết trái thực tế. Giải thích dạng động từ đã chọn.',
      checks: ['Xác định nghĩa của động từ dẫn trước khi quyết định dùng base form.', 'Phân biệt giả định hiện tại với cấu trúc giả định dùng were.']
    },
    c23: {
      goal: 'Diễn đạt mong ước, tiếc nuối và mong muốn bằng cấu trúc phù hợp mốc thời gian.',
      practice: 'Viết 4 câu về một mong ước hiện tại, một tiếc nuối quá khứ, điều bạn muốn người khác làm và một việc đã đến lúc thực hiện.',
      checks: ['Xác định điều mong muốn thuộc hiện tại, quá khứ hay sự thay đổi sắp tới.', 'Dạng động từ đúng với wish/if only, would rather hoặc it is time đã chọn.']
    },
    c24: {
      goal: 'Phân biệt nghĩa và cấu trúc của các cặp từ dễ nhầm trong ngữ cảnh.',
      practice: 'Chọn 3 cặp hoặc nhóm từ trong bài, viết mỗi nhóm 2 câu thể hiện sự khác nhau. Có một nhóm used to/be used to/get used to.',
      checks: ['Giải thích được khác biệt về nghĩa giữa các câu trong từng nhóm.', 'Kiểm tra dạng từ hoặc thành phần theo sau từng cụm, không chỉ dịch nghĩa.']
    },
    c25: {
      goal: 'Chọn từ hạn định theo số lượng đối tượng và nghĩa đếm được/không đếm được.',
      practice: 'Viết 6 câu về người và đồ vật trong một lớp học, dùng each/every, both/either/neither và another/other/the other.',
      checks: ['Người đọc xác định được bạn đang nói về hai đối tượng, nhiều đối tượng hay phần còn lại.', 'Danh từ và động từ đi kèm hòa hợp với từ hạn định đã dùng.']
    },
    c26: {
      goal: 'Giữ các thành phần được liệt kê hoặc nối tương quan cùng vai trò và dạng ngữ pháp.',
      practice: 'Viết 4 câu về mục tiêu học tập: hai câu liệt kê và hai câu dùng not only…but also hoặc both…and. Gạch chân các phần song song.',
      checks: ['Các phần cùng vai trò dùng cấu trúc tương ứng: danh từ, V-ing, to V hoặc mệnh đề.', 'Vị trí của cặp từ nối bao quanh đúng các thành phần đang so hoặc nối.']
    },
    c27: {
      goal: 'Phối hợp thì để phân biệt mạch kể, bối cảnh và sự việc xảy ra trước.',
      practice: 'Kể một chuyến đi bằng đoạn 6–8 câu, có bối cảnh đang diễn ra và một việc đã hoàn tất trước mốc kể. Vẽ thứ tự các sự việc trước khi viết.',
      checks: ['Các mốc trước–sau trong đoạn khớp với dòng thời gian bạn đã vẽ.', 'Mạch kể nhất quán; mỗi lần đổi thì đều có lý do về thời gian hoặc diễn tiến.']
    },
    c28: {
      goal: 'Kết hợp nhiều mệnh đề mà vẫn giữ chủ ngữ, ý chính và quan hệ logic rõ ràng.',
      practice: 'Viết 3 câu về công nghệ hoặc giáo dục, kết hợp các loại mệnh đề khác nhau. Tách một câu dài thành hai câu rồi so sánh độ rõ nghĩa.',
      checks: ['Xác định được mệnh đề chính và thành phần bổ nghĩa trong từng câu.', 'Không thiếu chủ ngữ/động từ; việc lồng mệnh đề giúp ý rõ hơn thay vì gây rối.']
    },
    c29: {
      goal: 'Chọn dạng từ theo vai trò trong câu và nhận diện nghĩa do tiền tố/hậu tố tạo ra.',
      practice: 'Chọn 3 họ từ trong bài, viết tổng cộng 6 câu có danh từ, động từ, tính từ hoặc trạng từ. Ghi vai trò của từ đã chọn.',
      checks: ['Dạng từ phù hợp vị trí và chức năng ngữ pháp trong câu.', 'Kiểm tra chính tả và sắc thái nghĩa; không coi mọi từ cùng gốc là thay thế được cho nhau.']
    },
    c30: {
      goal: 'Rà các điểm dễ bỏ sót về mức độ, vị trí trạng từ, phrasal verbs và câu hỏi đuôi.',
      practice: 'Chọn 3 tiểu mục bạn hay nhầm và viết mỗi tiểu mục 2 câu trong ngữ cảnh riêng. Ghi một câu hỏi tự kiểm tra bên cạnh mỗi nhóm.',
      checks: ['Giải thích được lựa chọn cấu trúc hoặc vị trí từ ở từng tiểu mục đã chọn.', 'Kiểm tra đại từ, trợ động từ và sự hòa hợp khi câu có câu hỏi đuôi hoặc danh từ tập hợp.']
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
