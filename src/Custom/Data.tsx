const allContents = [
  `
      Hà Nội, thủ đô ngàn năm văn hiến của Việt Nam, là trung tâm chính trị, kinh tế và văn hóa quan trọng. 
      Thành phố nổi tiếng với Hồ Gươm, nơi lưu giữ truyền thuyết về rùa vàng và thanh gươm thần. 
      Khu phố cổ với 36 phố phường vẫn giữ nguyên nét cổ kính và truyền thống từ hàng trăm năm trước. 
      Lăng Chủ tịch Hồ Chí Minh là nơi mà hàng triệu người dân và du khách viếng thăm mỗi năm. 
      Văn Miếu - Quốc Tử Giám là biểu tượng giáo dục và văn hóa của thủ đô. 
      Ẩm thực Hà Nội như phở, bún chả, và bánh cốm làm say lòng mọi du khách. 
      Hồ Tây, với không gian yên bình, là điểm đến lý tưởng cho việc thư giãn và ngắm hoàng hôn. 
      Các bảo tàng như Bảo tàng Dân tộc học và Bảo tàng Lịch sử lưu giữ giá trị văn hóa, lịch sử. 
      Hà Nội tổ chức nhiều lễ hội truyền thống, mang lại trải nghiệm sống động và phong phú. 
      Với sự pha trộn giữa cổ kính và hiện đại, Hà Nội luôn quyến rũ mọi trái tim.
    `,
  `
      Hải Phòng, thành phố cảng lớn nhất miền Bắc, là trung tâm kinh tế quan trọng của Việt Nam. 
      Đảo Cát Bà và Vịnh Lan Hạ là điểm đến lý tưởng với vẻ đẹp hoang sơ và nước biển trong xanh. 
      Lễ hội chọi trâu Đồ Sơn, một nét văn hóa độc đáo, thu hút đông đảo du khách mỗi năm. 
      Đồ ăn đặc sản Hải Phòng như bánh đa cua, nem cua bể, và bánh mì cay rất nổi tiếng. 
      Trung tâm thành phố với nhiều công trình kiến trúc kiểu Pháp cổ kính đầy ấn tượng. 
      Người dân Hải Phòng được biết đến với sự thẳng thắn và lòng hiếu khách. 
      Các làng nghề truyền thống như đóng tàu và gốm sứ mang lại nét đặc trưng riêng. 
      Những bãi biển đẹp và sạch sẽ tại Đồ Sơn luôn hấp dẫn du khách vào mùa hè. 
      Hải Phòng còn có nhiều khu công nghiệp lớn, góp phần phát triển kinh tế đất nước. 
      Với sự giao thoa giữa biển và đất liền, Hải Phòng luôn sôi động và giàu sức sống.
    `,
  `
      Đà Nẵng, thành phố đáng sống nhất Việt Nam, nổi tiếng với vẻ đẹp biển cả và sự phát triển hiện đại. 
      Bãi biển Mỹ Khê từng được tạp chí Forbes bình chọn là một trong những bãi biển đẹp nhất thế giới. 
      Cầu Rồng, một biểu tượng của Đà Nẵng, thu hút đông đảo du khách mỗi khi phun lửa và nước. 
      Bà Nà Hills với kiến trúc độc đáo và khí hậu mát mẻ là điểm đến không thể bỏ qua. 
      Ngũ Hành Sơn mang đến không gian tâm linh và thiên nhiên hòa quyện. 
      Ẩm thực Đà Nẵng như mì Quảng, bánh xèo, và hải sản tươi sống luôn làm hài lòng thực khách. 
      Lễ hội pháo hoa quốc tế Đà Nẵng là sự kiện văn hóa lớn, thu hút du khách toàn cầu. 
      Thành phố nổi bật với quy hoạch hiện đại, giao thông thuận tiện và môi trường sạch đẹp. 
      Người dân Đà Nẵng được biết đến với sự thân thiện, hiền hòa và hiếu khách. 
      Đà Nẵng không chỉ là nơi du lịch mà còn là điểm sống lý tưởng cho mọi người.
    `,
  `
      TP. Hồ Chí Minh, thành phố lớn nhất Việt Nam, là trung tâm kinh tế, văn hóa và giáo dục của cả nước. 
      Nhà thờ Đức Bà, với kiến trúc Gothic, là một biểu tượng đặc trưng của thành phố. 
      Chợ Bến Thành, khu mua sắm sầm uất, là nơi tập trung các món ăn và sản phẩm đặc trưng. 
      Phố đi bộ Nguyễn Huệ, trung tâm vui chơi và giải trí, luôn sôi động và nhộn nhịp. 
      Thành phố còn có nhiều bảo tàng, như Bảo tàng Chứng tích Chiến tranh, mang giá trị lịch sử sâu sắc. 
      Khu phố Tây Bùi Viện là nơi du khách quốc tế tụ hội để trải nghiệm văn hóa đêm. 
      Ẩm thực Sài Gòn phong phú với hủ tiếu, bánh mì và cơm tấm trứ danh. 
      Khu đô thị Phú Mỹ Hưng và Thủ Thiêm thể hiện vẻ hiện đại và tiềm năng phát triển của thành phố. 
      Người dân Sài Gòn nổi tiếng với sự cởi mở, hào phóng và sẵn sàng hỗ trợ người khác. 
      TP. Hồ Chí Minh là nơi hội tụ giữa truyền thống và hiện đại, luôn đầy năng lượng và sức sống.
    `,
  `
      Cần Thơ, trung tâm của miền Tây Nam Bộ, nổi tiếng với chợ nổi Cái Răng đặc trưng văn hóa sông nước. 
      Bến Ninh Kiều, biểu tượng của thành phố, là nơi lý tưởng để ngắm cảnh sông nước hữu tình. 
      Cần Thơ có nhiều vườn trái cây rộng lớn, là điểm đến hấp dẫn cho du khách vào mùa thu hoạch. 
      Làng du lịch Mỹ Khánh mang đến trải nghiệm văn hóa và ẩm thực miền Tây. 
      Những con người hiền lành, chất phác của Cần Thơ luôn tạo cảm giác gần gũi, thân thuộc. 
      Thành phố có nhiều lễ hội truyền thống như Lễ hội Bánh dân gian Nam Bộ đầy màu sắc. 
      Ẩm thực Cần Thơ phong phú với bánh xèo, lẩu mắm và cá lóc nướng trui. 
      Các ngôi chùa như chùa Ông, chùa Munirensay là nơi thể hiện sự giao thoa văn hóa. 
      Sông Hậu và hệ thống kênh rạch chằng chịt tạo nên vẻ đẹp sông nước độc đáo. 
      Cần Thơ không chỉ là nơi du lịch mà còn là vùng đất mang lại nhiều cảm hứng sáng tạo.
    `,
  `
    Nha Trang, thành phố biển nổi tiếng, là một trong những điểm du lịch hàng đầu Việt Nam. 
    Bãi biển Nha Trang với cát trắng, nước biển xanh ngọc là nơi lý tưởng để thư giãn. 
    Vinpearl Land, khu nghỉ dưỡng và vui chơi giải trí, được ví như "Disneyland của Việt Nam". 
    Hòn Mun, Hòn Tằm là những hòn đảo đẹp, nổi tiếng với dịch vụ lặn biển và ngắm san hô. 
    Tháp Bà Ponagar là di tích Chăm Pa cổ kính mang đậm dấu ấn lịch sử. 
    Nha Trang nổi tiếng với ẩm thực biển phong phú, đặc biệt là tôm hùm và nem Ninh Hòa. 
    Chợ Đầm là nơi du khách có thể tìm thấy các đặc sản và quà lưu niệm đặc trưng. 
    Festival Biển được tổ chức hàng năm, mang đến không khí lễ hội sôi động. 
    Thành phố còn là điểm đến lý tưởng cho du lịch chăm sóc sức khỏe với các spa và bùn khoáng. 
    Nha Trang là sự kết hợp hoàn hảo giữa thiên nhiên, văn hóa và dịch vụ hiện đại.
  `,
  `
    Đà Lạt, thành phố ngàn hoa, là điểm đến lãng mạn và yên bình trên cao nguyên Lâm Đồng. 
    Hồ Xuân Hương, trung tâm của thành phố, là nơi lý tưởng để ngắm cảnh và đạp xe. 
    Thung lũng Tình Yêu với phong cảnh hữu tình là điểm đến không thể bỏ qua cho các cặp đôi. 
    Đà Lạt nổi tiếng với các loài hoa đẹp như cẩm tú cầu, mai anh đào, và hoa dã quỳ. 
    Chợ Đà Lạt là nơi để khám phá ẩm thực phong phú và mua các đặc sản như dâu tây và mứt trái cây. 
    Kiến trúc độc đáo của các biệt thự Pháp cổ tạo nên vẻ quyến rũ riêng cho thành phố. 
    Khu du lịch LangBiang mang lại trải nghiệm phiêu lưu và cảnh quan tuyệt đẹp. 
    Nhà thờ Con Gà và Thiền viện Trúc Lâm là những điểm đến tâm linh nổi bật. 
    Ẩm thực đường phố với bánh tráng nướng, sữa đậu nành là những món ăn yêu thích của du khách. 
    Đà Lạt luôn mang đến cảm giác thư giãn, hòa mình với thiên nhiên trong lành.
  `,
  `
    Huế, cố đô của Việt Nam, là cái nôi của văn hóa, lịch sử và nghệ thuật truyền thống. 
    Quần thể di tích Cố đô Huế được UNESCO công nhận là Di sản Văn hóa Thế giới. 
    Đại Nội Huế, nơi lưu giữ kiến trúc triều Nguyễn, thu hút đông đảo du khách thăm quan. 
    Lăng Tự Đức, Lăng Minh Mạng là những công trình kiến trúc đỉnh cao của thời kỳ phong kiến. 
    Sông Hương và cầu Tràng Tiền là biểu tượng thơ mộng của Huế. 
    Huế nổi tiếng với ẩm thực phong phú như bún bò Huế, cơm hến và bánh bèo. 
    Lễ hội Festival Huế là dịp để du khách trải nghiệm văn hóa cung đình và dân gian đặc sắc. 
    Các làng nghề truyền thống như làm nón lá và làm hương tạo nên bản sắc riêng. 
    Người dân Huế nhẹ nhàng, thân thiện và luôn gìn giữ các giá trị văn hóa truyền thống. 
    Với vẻ đẹp cổ kính và sâu lắng, Huế là nơi mang lại cảm giác bình yên và hoài niệm.
  `,
  `
    Vũng Tàu, thành phố biển nổi tiếng gần TP. Hồ Chí Minh, là điểm nghỉ dưỡng lý tưởng cho du khách. 
    Bãi Sau và Bãi Trước với cát trắng và nước biển trong là địa điểm thư giãn yêu thích. 
    Tượng Chúa Kitô Vua, nằm trên đỉnh Núi Nhỏ, là biểu tượng nổi bật của thành phố. 
    Hải đăng Vũng Tàu mang đến tầm nhìn toàn cảnh tuyệt đẹp về thành phố và biển cả. 
    Ẩm thực Vũng Tàu đa dạng với bánh khọt, lẩu cá đuối và hải sản tươi ngon. 
    Cáp treo Núi Lớn dẫn đến Khu du lịch Hồ Mây, nơi du khách có thể tham gia nhiều hoạt động giải trí. 
    Vũng Tàu là điểm đến quen thuộc cho những người yêu thích các môn thể thao biển. 
    Lễ hội Nghinh Ông Thắng Tam là dịp thể hiện văn hóa tín ngưỡng đặc trưng của ngư dân. 
    Hệ thống khách sạn và resort phong phú đáp ứng mọi nhu cầu của du khách. 
    Với không khí biển cả và vẻ đẹp tự nhiên, Vũng Tàu luôn mang lại cảm giác thư thái.
  `,
  `
    Hà Giang, tỉnh cực Bắc của Việt Nam, nổi tiếng với cao nguyên đá Đồng Văn kỳ vĩ. 
    Mã Pí Lèng, một trong "tứ đại đỉnh đèo", là điểm đến mơ ước của dân phượt. 
    Lễ hội hoa tam giác mạch là sự kiện độc đáo, thu hút đông đảo du khách mỗi năm. 
    Cột cờ Lũng Cú, nơi địa đầu Tổ quốc, mang ý nghĩa thiêng liêng với người dân Việt Nam. 
    Chợ phiên vùng cao như chợ Đồng Văn, chợ Mèo Vạc là nơi giao lưu văn hóa đặc sắc. 
    Những bản làng của người H'mông, Dao, Tày mang lại trải nghiệm văn hóa đa dạng. 
    Ẩm thực Hà Giang với thắng cố, mèn mén và rượu ngô đậm đà hương vị vùng cao. 
    Những con đường đèo uốn lượn tạo nên cảnh quan vừa hiểm trở vừa thơ mộng. 
    Hà Giang còn là nơi du khách có thể trải nghiệm những mùa hoa độc đáo quanh năm. 
    Với vẻ đẹp hoang sơ và con người thân thiện, Hà Giang là nơi lưu giữ dấu ấn khó quên.
  `,
  `
  Quảng Ninh, tỉnh phía Bắc Việt Nam, nổi tiếng với kỳ quan thiên nhiên thế giới - Vịnh Hạ Long. 
  Vịnh Hạ Long với hàng ngàn đảo đá và hang động kỳ thú là điểm đến không thể bỏ qua. 
  Đảo Cô Tô và Quan Lạn mang đến bầu không khí yên bình và các bãi biển hoang sơ. 
  Chùa Yên Tử, nơi khởi nguồn của Thiền phái Trúc Lâm, là địa điểm tâm linh nổi tiếng. 
  Hạ Long Park và cáp treo Nữ Hoàng mang đến trải nghiệm giải trí hấp dẫn cho gia đình. 
  Ẩm thực Quảng Ninh phong phú với chả mực, sá sùng, và các món hải sản tươi ngon. 
  Thành phố Móng Cái nằm giáp biên giới Trung Quốc, có nhiều khu mua sắm sôi động. 
  Lễ hội Carnaval Hạ Long hàng năm tạo không khí lễ hội rực rỡ. 
  Quảng Ninh còn sở hữu các khu bảo tồn thiên nhiên và núi rừng kỳ vĩ. 
  Đây là điểm du lịch kết hợp giữa thiên nhiên, lịch sử và hiện đại hấp dẫn du khách.
`,
  `
  Hải Dương, tỉnh đồng bằng sông Hồng, nổi tiếng với các làng nghề truyền thống và văn hóa lâu đời. 
  Đền Kiếp Bạc là nơi thờ Hưng Đạo Đại Vương Trần Quốc Tuấn, gắn liền với lịch sử chống ngoại xâm. 
  Làng nghề gốm Chu Đậu là nơi gìn giữ nghệ thuật gốm sứ truyền thống độc đáo. 
  Côn Sơn - Kiếp Bạc là khu di tích gắn với cuộc đời của Nguyễn Trãi. 
  Đặc sản bánh đậu xanh Hải Dương nổi tiếng khắp cả nước với hương vị thanh tao. 
  Chùa Côn Sơn và chùa Đông Giao mang lại cảm giác bình yên và linh thiêng. 
  Hải Dương còn có lễ hội mùa xuân rộn ràng với nhiều nghi thức văn hóa đặc sắc. 
  Vùng đất này nổi tiếng với cảnh quan làng quê yên bình, sông nước hữu tình. 
  Đền Bia và chùa Phượng Hoàng là những điểm đến không thể bỏ qua khi đến đây. 
  Hải Dương là nơi lý tưởng để khám phá văn hóa và lịch sử đồng bằng Bắc Bộ.
`,
  `
  Bình Thuận, nơi sở hữu thành phố biển Phan Thiết, là điểm du lịch hấp dẫn của miền Trung. 
  Đồi cát Mũi Né với cảnh quan độc đáo như sa mạc là nơi lý tưởng để chụp ảnh. 
  Tháp Chăm Pô Sah Inư mang đậm dấu ấn văn hóa Champa cổ. 
  Làng chài Mũi Né đem đến trải nghiệm đời sống ngư dân chân thực. 
  Hải đăng Kê Gà là một trong những ngọn hải đăng cổ nhất Việt Nam. 
  Ẩm thực Bình Thuận nổi bật với các món bánh căn, bánh xèo và hải sản tươi ngon. 
  Suối Tiên với dòng nước đỏ cam độc đáo là điểm đến kỳ thú không thể bỏ qua. 
  Bình Thuận còn tổ chức lễ hội Dinh Thầy Thím, mang đậm màu sắc văn hóa dân gian. 
  Biển Cổ Thạch với những bãi đá đầy màu sắc là điểm đến yêu thích của các nhiếp ảnh gia. 
  Đây là nơi giao thoa giữa vẻ đẹp thiên nhiên và văn hóa lịch sử phong phú.
`,
  `
  Thanh Hóa, tỉnh lớn ở Bắc Trung Bộ, là vùng đất gắn liền với nhiều di tích lịch sử. 
  Thành nhà Hồ, Di sản Văn hóa Thế giới, là công trình kiến trúc đá cổ độc đáo. 
  Khu du lịch biển Sầm Sơn là điểm đến nổi tiếng thu hút đông đảo du khách mỗi năm. 
  Suối cá thần Cẩm Lương với hàng nghìn con cá tung tăng là điểm tham quan thú vị. 
  Di tích Lam Kinh gắn liền với lịch sử khởi nghĩa Lam Sơn của Lê Lợi. 
  Bãi Đông và Hải Tiến là những bãi biển hoang sơ đầy quyến rũ. 
  Nem chua Thanh Hóa là đặc sản trứ danh được du khách yêu thích. 
  Thanh Hóa còn có các lễ hội như Hội Lam Kinh và Lễ hội đền Sòng Sơn. 
  Với cảnh quan thiên nhiên đa dạng và lịch sử phong phú, Thanh Hóa luôn hấp dẫn du khách. 
  Đây là điểm đến lý tưởng để khám phá lịch sử và trải nghiệm văn hóa Việt Nam.
`,
  `
  Đồng Tháp, tỉnh miền Tây Nam Bộ, nổi tiếng với vẻ đẹp thanh bình của đồng bằng sông Cửu Long. 
  Làng hoa Sa Đéc là nơi du khách có thể chiêm ngưỡng những loài hoa rực rỡ sắc màu. 
  Vườn quốc gia Tràm Chim là nơi bảo tồn các loài chim quý hiếm, đặc biệt là sếu đầu đỏ. 
  Khu du lịch Xẻo Quýt là địa điểm hòa mình với thiên nhiên và tìm hiểu lịch sử chiến tranh. 
  Ẩm thực Đồng Tháp nổi tiếng với hủ tiếu Sa Đéc, cá lóc nướng trui và bánh xèo miền Tây. 
  Khu du lịch Gáo Giồng là nơi lý tưởng để chèo thuyền và thưởng ngoạn phong cảnh sông nước. 
  Đồng Tháp còn có nhà cổ Huỳnh Thủy Lê gắn liền với câu chuyện tình yêu lãng mạn. 
  Lễ hội Gò Tháp và Lễ hội hoa Sa Đéc là những sự kiện văn hóa nổi bật. 
  Thiên nhiên Đồng Tháp Mười với những cánh đồng sen bát ngát mang lại cảm giác thư thái. 
  Đây là nơi mang đến trải nghiệm đậm chất miền Tây Nam Bộ mà du khách không thể quên.
`,
];
export default allContents;
