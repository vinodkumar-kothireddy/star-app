const uploadToDropboxWithProgress = (path, fileOrBlob, onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://content.dropboxapi.com/2/files/upload");

    xhr.setRequestHeader("Authorization", "Bearer sl.u.AFy-OFix_wWaHKfGSqG9kHwOq4wayhNUthGvAPBIEhG1L-D6ofRK3Qk3QDMnyQtG9xcC6lQ_IacaW4s4yBKix7fb5t1ZaP9GC69sHoTIUqkkrqqSRBUJXOsOeO0fDlZWdiMGqFAVvPgPGguVsnlxhSnItbQSrXcHzu7RdaWmFQW17W8YNOts28m7xlM-2DNDgSJlwATUQhq5ZxLhuLKOVwbnNwUQeT9ynbf384Ncg6f0YPBaaT7O_TQT0ktPqnvWJy3eT1CtKMg16yhR0uquEJdJSCfEP02rQn57T7HjqdC80iVc9Hf_V0R0Yp1xV9RrpurT4rRK6zTrD3bcwQEgCtqFSH0SxwzfjucM2RYrQIMKRR_5tv5Y932YItNp750M67ozELvmcoISFjFAKoottwuT1Qb-WXeVEO7PfWyIUd_q4CJiOaLA5XqTv5Zx1ylLtBqbL5IB4vVqC5mTNb7QOgl29b6KtaLQPC1bzSor_pGDloo8x8I6lIkWEFs3qS0suD0vPyJ8bfBh6pIZ4AyeO7hdj0t5esfu7QlYsdxTFq5pPSSklR6rUAnzp_HWn134Ya7NVzkf0Lxi4p6p6UYHBmH4zB7d7OjLx-H-zjl9BOFLM49iDpPfCBa1oeNQrQ-KYhYWDzC0nXi1qNd6rhT3FWo9Egda9wB9Ey30zMjNF78tIbvs6WUFjSYipNvzdlzEPcc3Whhr033VbhznsSG978aO2uK7ZGpqCRM5kUsxyqEwabSdJeKs1HM9aZKT8VgbZoZKMHPJJUCp_fQwEXiw0NljbDdWiqVwBFd78ieWVSDhelGKJvJknljVknhOVsIrHtPKV4FrdmFRUwqRKLpMhr8j8v7Ly_H3BMhoIPR4MVs2g9ZKXBjgtRm6WmwyDYClnKKRoa91vFxwNE9r52FJhPjZCYE9rF2nVdm9z2sDeJg9HXQ5fSGLKn1qA4gHpcKPIKZzOWN-lwFTXw7LrYe7X6Y-1eZekVpIqAmPAtiHofT0JTUG8mwHztSJdWoTjMHu3ck8RPX0YBu3HsfaD66FyEbObBWIRvP-0PIZXYjKMEtjeQnqbP6Y0xlv1JuNWiGDD1gxeA8_uw2eLb-w5OONUx9rxeyGIHYkO3aqm8qGdw4z3gmRWk3G-CUhKA3ySocYCrZ5YaZgCdu239x_lHJhcWYNWzK2st32sKJltUB6O4xQkep8S1UOoa49gywROXc5_V5GosaWE8v3jOBqwh0vJhfUMnCZIKlE4-HNkkoBGwHs1IXJgqDck_Dg2Qh5pUSmrJvBk_WjDIoz_L3-YtNfX_a6syhgxrR7Hjg-pJ0K8rIV5ZkFCSYE3KImGXK0eRhGyofYIiyeBpAitHxZOFUphmvJDcGij0NBKEBpem7Yciwl4x-ELreDvynAihHppkZmNBB_ZYE_j6jW7nF4Uihhiqim8xRRtaDLMOIatgFWCM2Zvzgb1wc4E9i8vGMpOHejTBA");
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader(
      "Dropbox-API-Arg",
      JSON.stringify({
        path,
        mode: "add",
        autorename: true,
        mute: false,
      })
    );

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.responseText));
      }
    };

    xhr.onerror = () => reject(new Error("Upload failed"));
    xhr.send(fileOrBlob);
  });
};
