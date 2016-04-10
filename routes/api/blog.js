'use strict';

const express = require('express');
const router = new express.Router();

// Faux posts array
const posts = [
  {
    id: 0,
    title: 'Lorem ipsum dolor sit amet, consectetur.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel reprehenderit architecto, non id itaque sit fugit debitis, nisi placeat voluptatum laborum laudantium! Accusamus ullam nemo quidem deleniti eos id tenetur eveniet dicta dolores unde, repellat dolore odit adipisci molestiae incidunt inventore ipsum nam quis quas! Ipsa ducimus veritatis praesentium molestias rerum eos quasi accusamus nulla error, quas natus eius et obcaecati necessitatibus tenetur reprehenderit iusto quibusdam enim inventore consequuntur aliquid totam dolore incidunt expedita. Id vero eos, maxime accusantium similique nostrum voluptatum assumenda quis eveniet quod officia natus impedit doloribus explicabo consectetur facilis harum officiis laborum tempore quae? Cumque harum nobis tempora beatae laborum, voluptatum cum, unde distinctio maxime aperiam quam ducimus quia doloribus dolor explicabo iste temporibus sed magnam nesciunt labore! Eum alias doloremque reiciendis. Voluptatem explicabo molestias facilis, inventore esse nihil placeat iste excepturi dicta assumenda quia expedita perspiciatis! Perspiciatis, sed architecto cupiditate obcaecati fugiat eos illo sequi?',
  },
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut distinctio aliquam, assumenda doloribus eos sit architecto fuga non voluptatum eaque, dolorum unde, debitis perspiciatis id alias reprehenderit praesentium obcaecati labore reiciendis, aut illo sapiente natus in amet. Consequatur aliquam, molestias quod hic sapiente beatae deserunt tempora, facilis, ratione dignissimos provident quia. Sit culpa saepe magni ut ad eveniet, error ducimus alias possimus labore ipsam at in? Optio distinctio fugiat provident, doloremque nemo dolores odit. Sit cum sapiente eveniet fugit quo officiis molestias labore porro pariatur suscipit dolorem deserunt rem adipisci sunt vero quos, nobis blanditiis assumenda, quia. Temporibus sequi tempora corporis aliquid placeat, non itaque esse provident sapiente sint laudantium ab et. Assumenda ducimus veritatis quos culpa corporis pariatur deleniti, distinctio dignissimos, rerum eum minima ex nostrum accusantium. Veritatis maiores, hic sunt qui tenetur, perspiciatis consequatur adipisci quas labore saepe unde voluptate accusantium voluptatibus accusamus. Omnis vero numquam ea corporis.',
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit laborum commodi id facilis, cum dignissimos labore sunt eaque impedit nesciunt inventore, esse, minima accusantium. Sunt voluptates, maxime nobis natus ratione culpa deserunt dolore unde amet dolores, sit optio, repudiandae eveniet laudantium enim! Voluptate quis nobis, placeat, ex fugit, molestias non deserunt nesciunt tenetur numquam voluptatem. Nulla, quidem, sed? Distinctio repudiandae deserunt unde iste quae fugit nostrum perspiciatis aperiam, omnis. Ipsum at provident, veritatis impedit quis velit placeat eaque fuga et sunt expedita quaerat soluta nesciunt repellat, repudiandae quidem doloribus. Neque, fuga nesciunt excepturi quidem molestiae a, repellat voluptates aut dolore.',
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor sit amet.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab laborum ut reiciendis eligendi dolores et eaque voluptas quae consectetur temporibus dolorum maxime, molestiae odio modi fugit impedit ullam vitae quos, laudantium commodi similique sint ratione. Libero, nam eaque necessitatibus, dignissimos quod magni, omnis harum repellendus modi voluptates neque quis voluptate sint minima perspiciatis iste, velit debitis blanditiis voluptatibus obcaecati accusantium. Eius repudiandae sed sequi molestiae dolorem assumenda veniam soluta iste, natus quidem amet quibusdam a iure, perferendis in, corporis placeat nihil repellendus nisi tempore dicta! Asperiores, consequatur illo temporibus deleniti.',
  },
  {
    id: 4,
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel maxime eos velit dolorem fuga, molestias ipsa. Sunt temporibus modi repellat doloribus, quo amet! Eos aliquam a esse fuga nam eligendi quisquam voluptatem. Eum, neque illo esse aliquid error omnis provident officia nobis minima, et maiores ex. Consequuntur odio molestiae culpa repellendus ipsum, nulla. Magnam esse, adipisci iste atque praesentium itaque obcaecati facere aliquam facilis error harum mollitia, illo quibusdam voluptas, quasi maxime similique ipsa vitae. Ab in voluptate placeat corrupti accusamus amet quaerat, sint nisi hic rerum, iure eligendi, molestiae repellat totam numquam neque, non voluptatem commodi doloribus ullam provident facere fuga iste. Non illum enim culpa dolorem, laudantium nobis a quasi, perferendis aut iure tenetur, esse facere. Quibusdam, perspiciatis sed debitis temporibus laboriosam omnis fugiat sapiente, fugit possimus voluptates rerum blanditiis delectus eveniet cumque vitae nulla doloremque a quis corporis ipsum. Optio, saepe maxime reiciendis deserunt voluptas quae tempora! Sit, dicta. Voluptas obcaecati nostrum placeat, rem quidem adipisci aperiam. Ipsa beatae dignissimos ipsum quidem ab culpa cumque pariatur quos, quia, velit provident voluptate fuga repellat consequuntur est dolore. Quas delectus, vel, quidem enim doloremque, excepturi, neque facere ipsum doloribus culpa repudiandae est aspernatur sunt alias dicta quos. Rerum, incidunt?',
  },
  {
    id: 5,
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut distinctio aliquam, assumenda doloribus eos sit architecto fuga non voluptatum eaque, dolorum unde, debitis perspiciatis id alias reprehenderit praesentium obcaecati labore reiciendis, aut illo sapiente natus in amet. Consequatur aliquam, molestias quod hic sapiente beatae deserunt tempora, facilis, ratione dignissimos provident quia. Sit culpa saepe magni ut ad eveniet, error ducimus alias possimus labore ipsam at in? Optio distinctio fugiat provident, doloremque nemo dolores odit. Sit cum sapiente eveniet fugit quo officiis molestias labore porro pariatur suscipit dolorem deserunt rem adipisci sunt vero quos, nobis blanditiis assumenda, quia. Temporibus sequi tempora corporis aliquid placeat, non itaque esse provident sapiente sint laudantium ab et. Assumenda ducimus veritatis quos culpa corporis pariatur deleniti, distinctio dignissimos, rerum eum minima ex nostrum accusantium. Veritatis maiores, hic sunt qui tenetur, perspiciatis consequatur adipisci quas labore saepe unde voluptate accusantium voluptatibus accusamus. Omnis vero numquam ea corporis.',
  },
  {
    id: 6,
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut distinctio aliquam, assumenda doloribus eos sit architecto fuga non voluptatum eaque, dolorum unde, debitis perspiciatis id alias reprehenderit praesentium obcaecati labore reiciendis, aut illo sapiente natus in amet. Consequatur aliquam, molestias quod hic sapiente beatae deserunt tempora, facilis, ratione dignissimos provident quia. Sit culpa saepe magni ut ad eveniet, error ducimus alias possimus labore ipsam at in? Optio distinctio fugiat provident, doloremque nemo dolores odit. Sit cum sapiente eveniet fugit quo officiis molestias labore porro pariatur suscipit dolorem deserunt rem adipisci sunt vero quos, nobis blanditiis assumenda, quia. Temporibus sequi tempora corporis aliquid placeat, non itaque esse provident sapiente sint laudantium ab et. Assumenda ducimus veritatis quos culpa corporis pariatur deleniti, distinctio dignissimos, rerum eum minima ex nostrum accusantium. Veritatis maiores, hic sunt qui tenetur, perspiciatis consequatur adipisci quas labore saepe unde voluptate accusantium voluptatibus accusamus. Omnis vero numquam ea corporis.',
  },
  {
    id: 7,
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut distinctio aliquam, assumenda doloribus eos sit architecto fuga non voluptatum eaque, dolorum unde, debitis perspiciatis id alias reprehenderit praesentium obcaecati labore reiciendis, aut illo sapiente natus in amet. Consequatur aliquam, molestias quod hic sapiente beatae deserunt tempora, facilis, ratione dignissimos provident quia. Sit culpa saepe magni ut ad eveniet, error ducimus alias possimus labore ipsam at in? Optio distinctio fugiat provident, doloremque nemo dolores odit. Sit cum sapiente eveniet fugit quo officiis molestias labore porro pariatur suscipit dolorem deserunt rem adipisci sunt vero quos, nobis blanditiis assumenda, quia. Temporibus sequi tempora corporis aliquid placeat, non itaque esse provident sapiente sint laudantium ab et. Assumenda ducimus veritatis quos culpa corporis pariatur deleniti, distinctio dignissimos, rerum eum minima ex nostrum accusantium. Veritatis maiores, hic sunt qui tenetur, perspiciatis consequatur adipisci quas labore saepe unde voluptate accusantium voluptatibus accusamus. Omnis vero numquam ea corporis.',
  },
  {
    id: 8,
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut distinctio aliquam, assumenda doloribus eos sit architecto fuga non voluptatum eaque, dolorum unde, debitis perspiciatis id alias reprehenderit praesentium obcaecati labore reiciendis, aut illo sapiente natus in amet. Consequatur aliquam, molestias quod hic sapiente beatae deserunt tempora, facilis, ratione dignissimos provident quia. Sit culpa saepe magni ut ad eveniet, error ducimus alias possimus labore ipsam at in? Optio distinctio fugiat provident, doloremque nemo dolores odit. Sit cum sapiente eveniet fugit quo officiis molestias labore porro pariatur suscipit dolorem deserunt rem adipisci sunt vero quos, nobis blanditiis assumenda, quia. Temporibus sequi tempora corporis aliquid placeat, non itaque esse provident sapiente sint laudantium ab et. Assumenda ducimus veritatis quos culpa corporis pariatur deleniti, distinctio dignissimos, rerum eum minima ex nostrum accusantium. Veritatis maiores, hic sunt qui tenetur, perspiciatis consequatur adipisci quas labore saepe unde voluptate accusantium voluptatibus accusamus. Omnis vero numquam ea corporis.',
  },
  {
    id: 9,
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut distinctio aliquam, assumenda doloribus eos sit architecto fuga non voluptatum eaque, dolorum unde, debitis perspiciatis id alias reprehenderit praesentium obcaecati labore reiciendis, aut illo sapiente natus in amet. Consequatur aliquam, molestias quod hic sapiente beatae deserunt tempora, facilis, ratione dignissimos provident quia. Sit culpa saepe magni ut ad eveniet, error ducimus alias possimus labore ipsam at in? Optio distinctio fugiat provident, doloremque nemo dolores odit. Sit cum sapiente eveniet fugit quo officiis molestias labore porro pariatur suscipit dolorem deserunt rem adipisci sunt vero quos, nobis blanditiis assumenda, quia. Temporibus sequi tempora corporis aliquid placeat, non itaque esse provident sapiente sint laudantium ab et. Assumenda ducimus veritatis quos culpa corporis pariatur deleniti, distinctio dignissimos, rerum eum minima ex nostrum accusantium. Veritatis maiores, hic sunt qui tenetur, perspiciatis consequatur adipisci quas labore saepe unde voluptate accusantium voluptatibus accusamus. Omnis vero numquam ea corporis.',
  },
  {
    id: 10,
    title: 'Lorem ipsum dolor sit amet, consectetur.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel reprehenderit architecto, non id itaque sit fugit debitis, nisi placeat voluptatum laborum laudantium! Accusamus ullam nemo quidem deleniti eos id tenetur eveniet dicta dolores unde, repellat dolore odit adipisci molestiae incidunt inventore ipsum nam quis quas! Ipsa ducimus veritatis praesentium molestias rerum eos quasi accusamus nulla error, quas natus eius et obcaecati necessitatibus tenetur reprehenderit iusto quibusdam enim inventore consequuntur aliquid totam dolore incidunt expedita. Id vero eos, maxime accusantium similique nostrum voluptatum assumenda quis eveniet quod officia natus impedit doloribus explicabo consectetur facilis harum officiis laborum tempore quae? Cumque harum nobis tempora beatae laborum, voluptatum cum, unde distinctio maxime aperiam quam ducimus quia doloribus dolor explicabo iste temporibus sed magnam nesciunt labore! Eum alias doloremque reiciendis. Voluptatem explicabo molestias facilis, inventore esse nihil placeat iste excepturi dicta assumenda quia expedita perspiciatis! Perspiciatis, sed architecto cupiditate obcaecati fugiat eos illo sequi?',
  },
  {
    id: 11,
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut distinctio aliquam, assumenda doloribus eos sit architecto fuga non voluptatum eaque, dolorum unde, debitis perspiciatis id alias reprehenderit praesentium obcaecati labore reiciendis, aut illo sapiente natus in amet. Consequatur aliquam, molestias quod hic sapiente beatae deserunt tempora, facilis, ratione dignissimos provident quia. Sit culpa saepe magni ut ad eveniet, error ducimus alias possimus labore ipsam at in? Optio distinctio fugiat provident, doloremque nemo dolores odit. Sit cum sapiente eveniet fugit quo officiis molestias labore porro pariatur suscipit dolorem deserunt rem adipisci sunt vero quos, nobis blanditiis assumenda, quia. Temporibus sequi tempora corporis aliquid placeat, non itaque esse provident sapiente sint laudantium ab et. Assumenda ducimus veritatis quos culpa corporis pariatur deleniti, distinctio dignissimos, rerum eum minima ex nostrum accusantium. Veritatis maiores, hic sunt qui tenetur, perspiciatis consequatur adipisci quas labore saepe unde voluptate accusantium voluptatibus accusamus. Omnis vero numquam ea corporis.',
  },
  {
    id: 12,
    title: 'Lorem ipsum dolor sit.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit laborum commodi id facilis, cum dignissimos labore sunt eaque impedit nesciunt inventore, esse, minima accusantium. Sunt voluptates, maxime nobis natus ratione culpa deserunt dolore unde amet dolores, sit optio, repudiandae eveniet laudantium enim! Voluptate quis nobis, placeat, ex fugit, molestias non deserunt nesciunt tenetur numquam voluptatem. Nulla, quidem, sed? Distinctio repudiandae deserunt unde iste quae fugit nostrum perspiciatis aperiam, omnis. Ipsum at provident, veritatis impedit quis velit placeat eaque fuga et sunt expedita quaerat soluta nesciunt repellat, repudiandae quidem doloribus. Neque, fuga nesciunt excepturi quidem molestiae a, repellat voluptates aut dolore.',
  },
  {
    id: 13,
    title: 'Lorem ipsum dolor sit amet.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab laborum ut reiciendis eligendi dolores et eaque voluptas quae consectetur temporibus dolorum maxime, molestiae odio modi fugit impedit ullam vitae quos, laudantium commodi similique sint ratione. Libero, nam eaque necessitatibus, dignissimos quod magni, omnis harum repellendus modi voluptates neque quis voluptate sint minima perspiciatis iste, velit debitis blanditiis voluptatibus obcaecati accusantium. Eius repudiandae sed sequi molestiae dolorem assumenda veniam soluta iste, natus quidem amet quibusdam a iure, perferendis in, corporis placeat nihil repellendus nisi tempore dicta! Asperiores, consequatur illo temporibus deleniti.',
  },
  {
    id: 14,
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel maxime eos velit dolorem fuga, molestias ipsa. Sunt temporibus modi repellat doloribus, quo amet! Eos aliquam a esse fuga nam eligendi quisquam voluptatem. Eum, neque illo esse aliquid error omnis provident officia nobis minima, et maiores ex. Consequuntur odio molestiae culpa repellendus ipsum, nulla. Magnam esse, adipisci iste atque praesentium itaque obcaecati facere aliquam facilis error harum mollitia, illo quibusdam voluptas, quasi maxime similique ipsa vitae. Ab in voluptate placeat corrupti accusamus amet quaerat, sint nisi hic rerum, iure eligendi, molestiae repellat totam numquam neque, non voluptatem commodi doloribus ullam provident facere fuga iste. Non illum enim culpa dolorem, laudantium nobis a quasi, perferendis aut iure tenetur, esse facere. Quibusdam, perspiciatis sed debitis temporibus laboriosam omnis fugiat sapiente, fugit possimus voluptates rerum blanditiis delectus eveniet cumque vitae nulla doloremque a quis corporis ipsum. Optio, saepe maxime reiciendis deserunt voluptas quae tempora! Sit, dicta. Voluptas obcaecati nostrum placeat, rem quidem adipisci aperiam. Ipsa beatae dignissimos ipsum quidem ab culpa cumque pariatur quos, quia, velit provident voluptate fuga repellat consequuntur est dolore. Quas delectus, vel, quidem enim doloremque, excepturi, neque facere ipsum doloribus culpa repudiandae est aspernatur sunt alias dicta quos. Rerum, incidunt?',
  },
  {
    id: 15,
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut distinctio aliquam, assumenda doloribus eos sit architecto fuga non voluptatum eaque, dolorum unde, debitis perspiciatis id alias reprehenderit praesentium obcaecati labore reiciendis, aut illo sapiente natus in amet. Consequatur aliquam, molestias quod hic sapiente beatae deserunt tempora, facilis, ratione dignissimos provident quia. Sit culpa saepe magni ut ad eveniet, error ducimus alias possimus labore ipsam at in? Optio distinctio fugiat provident, doloremque nemo dolores odit. Sit cum sapiente eveniet fugit quo officiis molestias labore porro pariatur suscipit dolorem deserunt rem adipisci sunt vero quos, nobis blanditiis assumenda, quia. Temporibus sequi tempora corporis aliquid placeat, non itaque esse provident sapiente sint laudantium ab et. Assumenda ducimus veritatis quos culpa corporis pariatur deleniti, distinctio dignissimos, rerum eum minima ex nostrum accusantium. Veritatis maiores, hic sunt qui tenetur, perspiciatis consequatur adipisci quas labore saepe unde voluptate accusantium voluptatibus accusamus. Omnis vero numquam ea corporis.',
  },
  {
    id: 16,
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut distinctio aliquam, assumenda doloribus eos sit architecto fuga non voluptatum eaque, dolorum unde, debitis perspiciatis id alias reprehenderit praesentium obcaecati labore reiciendis, aut illo sapiente natus in amet. Consequatur aliquam, molestias quod hic sapiente beatae deserunt tempora, facilis, ratione dignissimos provident quia. Sit culpa saepe magni ut ad eveniet, error ducimus alias possimus labore ipsam at in? Optio distinctio fugiat provident, doloremque nemo dolores odit. Sit cum sapiente eveniet fugit quo officiis molestias labore porro pariatur suscipit dolorem deserunt rem adipisci sunt vero quos, nobis blanditiis assumenda, quia. Temporibus sequi tempora corporis aliquid placeat, non itaque esse provident sapiente sint laudantium ab et. Assumenda ducimus veritatis quos culpa corporis pariatur deleniti, distinctio dignissimos, rerum eum minima ex nostrum accusantium. Veritatis maiores, hic sunt qui tenetur, perspiciatis consequatur adipisci quas labore saepe unde voluptate accusantium voluptatibus accusamus. Omnis vero numquam ea corporis.',
  },
  {
    id: 17,
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut distinctio aliquam, assumenda doloribus eos sit architecto fuga non voluptatum eaque, dolorum unde, debitis perspiciatis id alias reprehenderit praesentium obcaecati labore reiciendis, aut illo sapiente natus in amet. Consequatur aliquam, molestias quod hic sapiente beatae deserunt tempora, facilis, ratione dignissimos provident quia. Sit culpa saepe magni ut ad eveniet, error ducimus alias possimus labore ipsam at in? Optio distinctio fugiat provident, doloremque nemo dolores odit. Sit cum sapiente eveniet fugit quo officiis molestias labore porro pariatur suscipit dolorem deserunt rem adipisci sunt vero quos, nobis blanditiis assumenda, quia. Temporibus sequi tempora corporis aliquid placeat, non itaque esse provident sapiente sint laudantium ab et. Assumenda ducimus veritatis quos culpa corporis pariatur deleniti, distinctio dignissimos, rerum eum minima ex nostrum accusantium. Veritatis maiores, hic sunt qui tenetur, perspiciatis consequatur adipisci quas labore saepe unde voluptate accusantium voluptatibus accusamus. Omnis vero numquam ea corporis.',
  },
  {
    id: 18,
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut distinctio aliquam, assumenda doloribus eos sit architecto fuga non voluptatum eaque, dolorum unde, debitis perspiciatis id alias reprehenderit praesentium obcaecati labore reiciendis, aut illo sapiente natus in amet. Consequatur aliquam, molestias quod hic sapiente beatae deserunt tempora, facilis, ratione dignissimos provident quia. Sit culpa saepe magni ut ad eveniet, error ducimus alias possimus labore ipsam at in? Optio distinctio fugiat provident, doloremque nemo dolores odit. Sit cum sapiente eveniet fugit quo officiis molestias labore porro pariatur suscipit dolorem deserunt rem adipisci sunt vero quos, nobis blanditiis assumenda, quia. Temporibus sequi tempora corporis aliquid placeat, non itaque esse provident sapiente sint laudantium ab et. Assumenda ducimus veritatis quos culpa corporis pariatur deleniti, distinctio dignissimos, rerum eum minima ex nostrum accusantium. Veritatis maiores, hic sunt qui tenetur, perspiciatis consequatur adipisci quas labore saepe unde voluptate accusantium voluptatibus accusamus. Omnis vero numquam ea corporis.',
  },
  {
    id: 19,
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut distinctio aliquam, assumenda doloribus eos sit architecto fuga non voluptatum eaque, dolorum unde, debitis perspiciatis id alias reprehenderit praesentium obcaecati labore reiciendis, aut illo sapiente natus in amet. Consequatur aliquam, molestias quod hic sapiente beatae deserunt tempora, facilis, ratione dignissimos provident quia. Sit culpa saepe magni ut ad eveniet, error ducimus alias possimus labore ipsam at in? Optio distinctio fugiat provident, doloremque nemo dolores odit. Sit cum sapiente eveniet fugit quo officiis molestias labore porro pariatur suscipit dolorem deserunt rem adipisci sunt vero quos, nobis blanditiis assumenda, quia. Temporibus sequi tempora corporis aliquid placeat, non itaque esse provident sapiente sint laudantium ab et. Assumenda ducimus veritatis quos culpa corporis pariatur deleniti, distinctio dignissimos, rerum eum minima ex nostrum accusantium. Veritatis maiores, hic sunt qui tenetur, perspiciatis consequatur adipisci quas labore saepe unde voluptate accusantium voluptatibus accusamus. Omnis vero numquam ea corporis.',
  },
];

// Posts index
router.get('/posts?', (req, res) => {
  let count;

  if (req.query.count || req.query.count !== '0') {
    count = parseInt(req.query.count, 10);
  }

  return res.json(count ? posts.slice(0, count) : posts);
});

// Post show
router.get('/post/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    return res.json({
      error: 'id_not_integer',
    });
  }

  const post = posts.find((p) => (
    p.id === parseInt(req.params.id, 10)
  ));

  if (!post) {
    return res.json({
      error: 'post_not_found',
    });
  }

  return res.json(post);
});

module.exports = router;
