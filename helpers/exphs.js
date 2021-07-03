module.exports = {
  adminFeature(user, id) {
    // console.log(access, id);
    if (!user) {
      return null;
    }
    if (user.accessLevel == "admin") {
      return `
            <a class="tag tag-delete confirm " href="/products/delete/${id}"><i
            class="fas fa-trash"
          ></i></a>
        <a class="tag tag-edit" href="/products/edit/${id}"><i
            class="fas fa-edit"
          ></i></a>
        `;
    }
    return null;
  },
  adminAddLink(user) {
    if (user) {
      if ((user.accessLevel = "admin")) {
        return `
         <li><a href="/products/add"> درج محصولات </a></li>
         <li><a href="/order/all"> سفارشات</a></li>
         <li><a href="/message/all"> پیامها</a></li>
        `;
      } else {
        return null;
      }
    } else {
      return null;
    }
  },
  commaSeparate: (number, currency = null) => {
    let num = Number(number);
    if (currency == "تومان") {
      num = num / 10;
      return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
    }

    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  },
  getImage(images, index) {
    return images[index].fileName;
  },
  texttruncate(str, number = 100) {
    return str.substring(0, number) + "...";
  },
};
