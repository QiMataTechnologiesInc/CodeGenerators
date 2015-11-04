#ifndef __QIMATA__CODEGENERATORS__COMMON__MODELS__CPP_TYPE_MODEL__HPP__
#define __QIMATA__CODEGENERATORS__COMMON__MODELS__CPP_TYPE_MODEL__HPP__

#include <string>
#include <vector>

namespace qimata
{
	namespace codegenerators
	{
		namespace common
		{
			namespace models
			{
				struct cpp_type_model
				{
					std::vector<std::string> namespaces;
					std::string class_name;
				};
			};
		};
	};
};


#endif //__QIMATA__CODEGENERATORS__COMMON__MODELS__CPP_TYPE_MODEL__HPP__